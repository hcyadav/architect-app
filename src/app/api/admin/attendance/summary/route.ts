import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get("month") || ""); // 0-11
    const year = parseInt(searchParams.get("year") || "");

    if (isNaN(month) || isNaN(year)) {
      return NextResponse.json({ error: "Month and Year are required" }, { status: 400 });
    }
    
    // Get full day hours setting
    const settings = await prisma.settings.findUnique({
      where: { key: "FULL_DAY_HOURS" }
    });
    const fullDayHours = (settings?.value as number) || 9;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const employees = await prisma.employee.findMany({
      where: { status: "active" }
    });
    
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        date: { gte: startDate, lte: endDate }
      }
    });

    const summary = employees.map(emp => {
      const empRecords = attendanceRecords.filter(r => r.employeeId === emp.id);
      
      const details = {
          fullDays: empRecords.filter(r => r.status === 'full' || r.status === 'full_day').length,
          halfDays: empRecords.filter(r => r.status === 'half' || r.status === 'half_day').length,
          oneFiveDays: empRecords.filter(r => r.status === 'one_five_days').length,
          twoDays: empRecords.filter(r => r.status === 'two_days').length,
          holidays: empRecords.filter(r => r.status === 'holiday').length,
          absents: empRecords.filter(r => r.status === 'absent').length,
          hourlyHours: empRecords
              .filter(r => r.status === 'hourly')
              .reduce((sum, r) => sum + (r.hours || 0), 0)
      };

      const payableFromHourly = details.hourlyHours / fullDayHours;
      const totalPayableDays = details.fullDays + 
                               (details.halfDays * 0.5) + 
                               (details.oneFiveDays * 1.5) + 
                               (details.twoDays * 2.0) + 
                               payableFromHourly;

      return {
          employeeId: emp.id,
          name: `${emp.firstName} ${emp.lastName}`,
          designation: emp.designation,
          details,
          totalPayableDays: parseFloat(totalPayableDays.toFixed(2))
      };
    });

    return NextResponse.json({ summary, month, year, fullDayHours });
  } catch (error) {
    console.error("Summary error:", error);
    return NextResponse.json({ error: "Failed to calculate summary" }, { status: 500 });
  }
}
