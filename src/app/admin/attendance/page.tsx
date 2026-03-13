"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    Clock,
    Search,
    Eye,
    Edit,
    DollarSign,
    ArrowLeft,
    Save,
    X
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BackButton from "@/components/BackButton";

interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    designation: string;
    status: string;
    joiningDate: string;
}

interface AttendanceRecord {
    _id?: string;
    date: string;
    status: "full_day" | "half_day" | "hourly" | "holiday" | "absent" | "1.5_days" | "2_days";
    hours?: number;
    remarks?: string;
    wages?: number;
}

export default function AttendancePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

    // Pagination for employee selection
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    const [entryOpen, setEntryOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<AttendanceRecord>>({
        status: "full_day",
        hours: 0,
        remarks: "",
        wages: 0
    });

    const fetchEmployees = async (page: number, search: string) => {
        try {
            setLoading(true);
            const params: any = { page, limit, status: "active" };
            if (search) params.search = search;

            const res = await axios.get("/api/admin/employees", { params });
            if (res.data.employees) {
                setEmployees(res.data.employees);
                setTotalPages(res.data.totalPages ?? 1);
            } else {
                setEmployees(res.data);
                setTotalPages(1);
            }
        } catch (e) {
            toast.error("Failed to load employees");
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendance = async (employeeId: string) => {
        try {
            const res = await axios.get(`/api/admin/attendance?employeeId=${employeeId}`);
            setAttendanceRecords(res.data);
        } catch (e) {
            toast.error("Failed to load attendance records");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEmployees(currentPage, searchTerm);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm, currentPage]);

    // Reset page on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const goToPage = (page: number) => {
        const p = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(p);
    };


    useEffect(() => {
        if (selectedEmployee) {
            fetchAttendance(selectedEmployee._id);
        }
    }, [selectedEmployee]);

    const handleDateClick = (arg: any) => {
        const dateStr = arg.dateStr;
        setSelectedDate(dateStr);

        const existing = attendanceRecords.find(r =>
            format(new Date(r.date), "yyyy-MM-dd") === dateStr
        );

        if (existing) {
            setFormData({
                status: existing.status,
                hours: existing.hours || 0,
                remarks: existing.remarks || "",
                wages: existing.wages || 0
            });
        } else {
            setFormData({
                status: "full_day",
                hours: 0,
                remarks: "",
                wages: 0
            });
        }
        setEntryOpen(true);
    };

    const handleEventClick = (arg: any) => {
        const existing = arg.event.extendedProps;
        // The calendar always knows the correct local YYYY-MM-DD visual placement via startStr
        const dateStr = arg.event.startStr.split('T')[0];
        setSelectedDate(dateStr);

        if (existing) {
            setFormData({
                status: existing.status,
                hours: existing.hours || 0,
                remarks: existing.remarks || "",
                wages: existing.wages || 0
            });
        }
        setEntryOpen(true);
    };

    const handleSaveAttendance = async () => {
        if (!selectedEmployee || !selectedDate) return;

        if (!formData.remarks?.trim()) {
            toast.error("Please fill the remarks field before submitting.");
            return;
        }

        try {
            await axios.post("/api/admin/attendance", {
                employeeId: selectedEmployee._id,
                date: selectedDate, // Send YYYY-MM-DD directly
                ...formData
            });
            toast.success("Attendance updated");
            setFormData({
                status: "full_day",
                hours: 0,
                remarks: "",
                wages: 0
            });
            setEntryOpen(false);
            fetchAttendance(selectedEmployee._id);
        } catch (e) {
            toast.error("Failed to save attendance");
        }
    };

    const events = useMemo(() => {
        return attendanceRecords.map(record => ({
            title: record.status,
            date: record.date,
            backgroundColor: "transparent",
            borderColor: "transparent",
            extendedProps: { ...record }
        }));
    }, [attendanceRecords]);

    const totalWages = useMemo(() => {
        return attendanceRecords.reduce((sum, r) => sum + (r.wages || 0), 0);
    }, [attendanceRecords]);

    const totalPayableDays = useMemo(() => {
        return attendanceRecords.reduce((sum, r) => {
            if (r.status === "full_day") return sum + 1;
            if (r.status === "half_day") return sum + 0.5;
            if (r.status === "1.5_days") return sum + 1.5;
            if (r.status === "2_days") return sum + 2;
            if (r.status === "hourly" && r.hours) {
                if (r.hours >= 8) return sum + 1;
                if (r.hours === 4) return sum + 0.5;
            }
            return sum;
        }, 0);
    }, [attendanceRecords]);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-6">

                {/* Back Button */}
                <BackButton />

                {/* Title + Search */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    {/* Left - Title */}
                    <div>
                        <h1 className="text-3xl font-serif text-gray-900">Attendance</h1>
                        <p className="text-gray-500 font-light">
                            Select an active employee to track attendance and wages
                        </p>
                    </div>

                    {/* Right - Search */}
                    {!selectedEmployee && (
                        <div className="relative group min-w-[300px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
                            <Input
                                placeholder="Search employee..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-12 pl-12 pr-4 bg-white border-gray-100 rounded-2xl shadow-sm focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                            />
                        </div>
                    )}

                </div>

            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
                {!selectedEmployee ? (
                    <div className="flex flex-col">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow className="hover:bg-transparent border-gray-100">
                                    <TableHead className="px-8 font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Employee</TableHead>
                                    <TableHead className="font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Designation</TableHead>
                                    <TableHead className="font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Status</TableHead>
                                    <TableHead className="text-right px-8 font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-20 text-gray-300 italic">Loading employees...</TableCell>
                                    </TableRow>
                                ) : employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-20 text-gray-300 italic">No employees found.</TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map((emp) => (
                                        <TableRow key={emp._id} className="hover:bg-gray-50/30 border-gray-50 transition-colors group">
                                            <TableCell className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{emp.firstName} {emp.lastName}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{emp.designation}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-500 font-light">{emp.designation}</TableCell>
                                            <TableCell>
                                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                                    {emp.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right px-8">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setSelectedEmployee(emp)}
                                                        className="w-9 h-9 rounded-xl hover:bg-gray-100 text-gray-400"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination Footer — inside card */}
                        {employees.length > 0 && (
                            <div className="flex items-center justify-between px-8 py-5 border-t border-gray-100 bg-gray-50/40">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Page {currentPage} of {totalPages || 1}
                                </span>
                                <div className="flex items-center gap-1">
                                    {/* Previous */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() => goToPage(currentPage - 1)}
                                        className="rounded-xl px-4 h-9 text-sm"
                                    >
                                        ← Prev
                                    </Button>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                                        .reduce<(number | string)[]>((acc, p, idx, arr) => {
                                            if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                                            acc.push(p);
                                            return acc;
                                        }, [])
                                        .map((p, idx) =>
                                            p === "..." ? (
                                                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">...</span>
                                            ) : (
                                                <Button
                                                    key={p}
                                                    variant={currentPage === p ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => goToPage(p as number)}
                                                    className={`w-9 h-9 rounded-xl text-sm font-bold ${currentPage === p
                                                        ? "bg-gray-900 text-white border-gray-900"
                                                        : "text-gray-500"
                                                        }`}
                                                >
                                                    {p}
                                                </Button>
                                            )
                                        )
                                    }

                                    {/* Next */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === totalPages || totalPages <= 1}
                                        onClick={() => goToPage(currentPage + 1)}
                                        className="rounded-xl px-4 h-9 text-sm"
                                    >
                                        Next →
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 p-8 max-w-full animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Header Area */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedEmployee(null)}
                                    className="w-10 h-10 rounded-2xl hover:bg-gray-100"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                                <div>
                                    <h2 className="text-2xl font-serif text-gray-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
                                    <p className="text-gray-400 font-light text-sm italic">Attendance Calendar</p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="border-gray-200 text-gray-700 hover:bg-gray-100 rounded-xl"
                                onClick={() => setSelectedEmployee(null)}
                            >
                                Back to Employee List
                            </Button>
                        </div>

                        {/* Top Section: Status Guide & Total Wages */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Status Guide */}
                            <div className="flex-1 bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-wrap gap-x-8 gap-y-4 items-center">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-4">Status Guide:</h4>
                                {[
                                    { label: "Full Day", color: "bg-green-500", desc: "8-10h" },
                                    { label: "1.5 Days", color: "bg-teal-500", desc: "12-15h" },
                                    { label: "2 Days", color: "bg-indigo-500", desc: "16-20h" },
                                    { label: "Half Day", color: "bg-blue-500", desc: "4-5h" },
                                    { label: "Hourly", color: "bg-amber-500", desc: "Custom" },
                                    { label: "Holiday/Absent", color: "bg-red-500", desc: "Leave" }
                                ].map((status, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${status.color} shrink-0`} />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 leading-none">{status.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Wages */}
                            <div className="lg:w-80 bg-gray-900 p-6 rounded-[2rem] text-white shadow-xl flex flex-col justify-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Wages Taken</p>
                                <h3 className="text-3xl font-serif text-[#D4AF37]">₹ {totalWages.toLocaleString()}</h3>
                                <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                                    <p className="text-xs text-gray-400">Total payable days</p>
                                    <p className="text-sm font-bold">{totalPayableDays}</p>
                                </div>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="calendar-container w-full overflow-x-auto bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="min-w-[600px] w-full">
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    events={events}
                                    dateClick={handleDateClick}
                                    eventClick={handleEventClick}
                                    eventContent={(eventInfo) => {
                                        const { status, wages, remarks, hours } = eventInfo.event.extendedProps;
                                        let bgColor = "bg-green-500";
                                        let label = "Full Day";

                                        if (status === "half_day") { bgColor = "bg-blue-500"; label = "Half Day"; }
                                        else if (status === "1.5_days") { bgColor = "bg-teal-500"; label = "1.5 Days"; }
                                        else if (status === "2_days") { bgColor = "bg-indigo-500"; label = "2 Days"; }
                                        else if (status === "hourly") { bgColor = "bg-amber-500"; label = "Hourly"; }
                                        else if (status === "holiday") { bgColor = "bg-red-500"; label = "Holiday"; }
                                        else if (status === "absent") { bgColor = "bg-red-500"; label = "Absent"; }

                                        let tooltipText = `Status: ${label}`;
                                        if (status === "hourly" && hours) tooltipText += `\nHours: ${hours}`;
                                        if (wages) tooltipText += `\nWages: ₹ ${wages}`;
                                        if (remarks) tooltipText += `\nRemarks: ${remarks}`;

                                        return (
                                            <div title={tooltipText} className={`p-1.5 flex flex-col w-full rounded-md text-white shadow-sm ${bgColor} hover:opacity-90 transition-opacity cursor-pointer border-none`}>
                                                <div className="text-xs font-bold leading-tight truncate">{label}</div>
                                                {wages ? <div className="text-[10px] font-medium leading-tight mt-0.5">₹ {wages}</div> : null}
                                                {remarks ? <div className="text-[9px] font-light italic leading-tight mt-0.5 truncate opacity-90">{remarks}</div> : null}
                                            </div>
                                        );
                                    }}
                                    headerToolbar={{
                                        left: "prev,next today",
                                        center: "title",
                                        right: "dayGridMonth"
                                    }}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Attendance Entry Dialog */}
            <Dialog open={entryOpen} onOpenChange={setEntryOpen}>
                <DialogContent className="p-0 border-none overflow-hidden max-w-7xl flex flex-col rounded-[3rem] shadow-2xl bg-white w-[95vw]">
                    <div className="bg-gray-900 p-10 relative text-white">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-serif">
                                {selectedDate ? format(new Date(selectedDate), "PPPP") : ""}
                            </DialogTitle>
                            <p className="text-gray-400 font-light mt-1">Set status and track wages for this day</p>
                        </DialogHeader>
                        <Button
                            variant="ghost"
                            className="absolute right-6 top-6 text-gray-400 hover:text-white"
                            onClick={() => setEntryOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSaveAttendance(); }} className="p-10 space-y-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Work Status</label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(v: any) => setFormData({ ...formData, status: v })}
                                >
                                    <SelectTrigger className="h-14 rounded-2xl bg-gray-50 border-gray-100 focus:ring-[#D4AF37]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-gray-100">
                                        <SelectItem value="full_day">Full Day</SelectItem>
                                        <SelectItem value="1.5_days">1.5 Days</SelectItem>
                                        <SelectItem value="2_days">2 Days</SelectItem>
                                        <SelectItem value="half_day">Half Day</SelectItem>
                                        <SelectItem value="hourly">Hourly</SelectItem>
                                        <SelectItem value="holiday">Holiday/Leave</SelectItem>
                                        <SelectItem value="absent">Absent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {formData.status === "hourly" && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Work Hours</label>
                                    <Input
                                        type="number"
                                        step="0.5"
                                        placeholder="Enter hours..."
                                        value={formData.hours || ""}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            let newStatus = formData.status;
                                            if (val >= 8) newStatus = "full_day";
                                            else if (val === 4) newStatus = "half_day";
                                            setFormData({ ...formData, hours: val, status: newStatus });
                                        }}
                                        className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Wages for this day (₹)</label>
                                <Input
                                    type="number"
                                    placeholder="Enter amount..."
                                    value={formData.wages || ""}
                                    onChange={(e) => setFormData({ ...formData, wages: Number(e.target.value) })}
                                    className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                />
                                <p className="text-[10px] text-gray-400 italic">This will be added to the total payout</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Remarks <span className="text-red-500">*</span></label>
                            <Input
                                required
                                placeholder="Add any notes for this day (Required)..."
                                value={formData.remarks || ""}
                                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-16 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-xl hover:translate-y-[-2px] transition-all"
                            >
                                Save Entry
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
