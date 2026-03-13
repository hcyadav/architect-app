import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");
    const employeeId = searchParams.get("employeeId");
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");
    const pageParam = searchParams.get("page");
    const defaultLimit = process.env.ATTENDANCE_PAGE_LIMIT || "10";
    const page = pageParam ? parseInt(pageParam) : null;
    const limit = parseInt(searchParams.get("limit") || defaultLimit);

    await connectToDatabase();

    let query: any = {};

    if (dateStr) {
      const date = new Date(dateStr);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      query.date = { $gte: date, $lt: nextDay };
    } else if (startDateStr && endDateStr) {
      const start = new Date(startDateStr);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDateStr);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    if (employeeId) {
      query.employeeId = employeeId;
    }

    // Only paginate when `page` param is explicitly provided (calendar needs all records)
    if (page !== null) {
      const skip = (page - 1) * limit;
      const [attendance, totalRecords] = await Promise.all([
        Attendance.find(query).sort({ date: -1 }).skip(skip).limit(limit),
        Attendance.countDocuments(query)
      ]);
      return NextResponse.json({
        attendance,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page
      });
    }

    // No pagination — return all (used for calendar display)
    const attendance = await Attendance.find(query).sort({ date: -1 });
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { employeeId, date, status, hours, remarks, wages } = body;

    await connectToDatabase();
    
    let year, month, day;
    if (date.includes('T')) {
      [year, month, day] = date.split('T')[0].split('-');
    } else if (date.includes('/')) {
      const [datePart] = date.split(',');
      [day, month, year] = datePart.trim().split('/');
    } else {
      [year, month, day] = date.split('-');
    }
    
    // Create Date using local components to avoid UTC shift
    const attendanceDate = new Date(Number(year), Number(month) - 1, Number(day));
    attendanceDate.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date: attendanceDate },
      { status, hours, remarks, wages },
      { upsert: true, new: true }
    );

    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}

