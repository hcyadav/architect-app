"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserPlus, Trash2, Edit, Search, Filter, MoreVertical, X } from "lucide-react";
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BackButton from "@/components/BackButton";

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    designation: string;
    joiningDate: string;
    status: "active" | "inactive";
}

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        designation: "",
        status: "active" as "active" | "inactive",
        joiningDate: new Date().toISOString().split('T')[0],
    });

    // Accept page as param to avoid stale closure
    const fetchEmployees = async (page: number, search: string, status: string) => {
        try {
            setLoading(true);
            const params: any = { page, limit };
            if (search) params.search = search;
            if (status !== "all") params.status = status;

            const res = await axios.get("/api/admin/employees", { params });
            setEmployees(res.data.employees);
            setTotalPages(res.data.totalPages ?? 1);
        } catch (e) {
            toast.error("Failed to load employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEmployees(currentPage, searchTerm, statusFilter);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter, currentPage]);

    // Reset to page 1 when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const goToPage = (page: number) => {
        const p = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(p);
    };


    const handleOpenAdd = () => {
        setEditMode(false);
        setSelectedEmployee(null);
        setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            designation: "",
            status: "active",
            joiningDate: new Date().toISOString().split('T')[0],
        });
        setOpen(true);
    };

    const handleOpenEdit = (emp: Employee) => {
        setEditMode(true);
        setSelectedEmployee(emp);
        setFormData({
            firstName: emp.firstName,
            lastName: emp.lastName,
            phoneNumber: emp.phoneNumber,
            designation: emp.designation,
            status: emp.status,
            joiningDate: new Date(emp.joiningDate).toISOString().split('T')[0]
        });
        setOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isNumeric = /^\d+$/.test(formData.phoneNumber);
        if (!isNumeric || formData.phoneNumber.length > 10) {
            toast.error("Phone number must be numeric and maximum 10 digits");
            return;
        }

        try {
            if (editMode && selectedEmployee) {
                await axios.put(`/api/admin/employees/${selectedEmployee.id}`, formData);
                toast.success("Employee updated successfully");
            } else {
                await axios.post("/api/admin/employees", formData);
                toast.success("Employee added successfully");
            }
            setOpen(false);
            fetchEmployees(currentPage, searchTerm, statusFilter);
        } catch (e: any) {
            const errorMsg = e.response?.data?.details || (editMode ? "Failed to update employee" : "Failed to add employee");
            toast.error(errorMsg);
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) return;
        try {
            await axios.delete(`/api/admin/employees/${confirmDelete}`);
            toast.success("Employee deleted successfully");
            setConfirmDelete(null);
            fetchEmployees(currentPage, searchTerm, statusFilter);
        } catch (e: any) {
            const errorMsg = e.response?.data?.details || "Failed to delete employee";
            toast.error(errorMsg);
        }
    };


    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-sans text-gray-900">Employees</h1>
                    <p className="text-gray-500 font-light">
                        Manage your staff and team members
                    </p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col max-w-7xl  md:flex-row md:items-center md:justify-between gap-4">

                    {/* Left - Add Employee */}
                    <Button
                        onClick={handleOpenAdd}
                        className="h-12 bg-gray-900 hover:bg-black text-white rounded-2xl flex items-center gap-2 px-6 shadow-lg shadow-gray-200"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Employee
                    </Button>

                    {/* Right - Filters + Search */}
                    <div className="flex flex-col sm:flex-row gap-3">

                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
                            <SelectTrigger className="w-30 h-12 rounded-2xl bg-white border-gray-100 shadow-sm focus:ring-[#D4AF37]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-gray-100">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Search */}
                        <div className="relative group min-w-[240px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
                            <Input
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-12 pl-12 pr-4 bg-white border-gray-100 rounded-2xl shadow-sm focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                            />
                        </div>

                    </div>
                </div>

            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent border-gray-100">
                            <TableHead className="px-8 font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Full Name</TableHead>
                            <TableHead className="font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Phone Number</TableHead>
                            <TableHead className="font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Status</TableHead>
                            <TableHead className="font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Joining Date</TableHead>
                            <TableHead className="text-right px-8 font-bold text-gray-400 uppercase tracking-widest text-[10px] h-16">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-gray-400 font-light italic">Loading team members...</TableCell>
                            </TableRow>
                        ) : employees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-gray-400 font-light italic">No employees found.</TableCell>
                            </TableRow>
                        ) : (
                            employees.map((emp) => (
                                <TableRow key={emp.id} className="hover:bg-gray-50/30 border-gray-50 transition-colors group">
                                    <TableCell className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            {/* <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[#D4AF37] font-bold border border-gray-100">
                                                {emp.firstName.charAt(0)}
                                            </div> */}
                                            <div>
                                                <p className="font-medium text-gray-900">{emp.firstName} {emp.lastName}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{emp.designation}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600 font-medium">
                                        {emp.phoneNumber}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${emp.status === "active" ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
                                            {emp.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500 font-light">
                                        {new Date(emp.joiningDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right px-8">
                                        <div className="flex items-center justify-end gap-2  transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenEdit(emp)}
                                                className="w-9 h-9 rounded-xl hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-400"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setConfirmDelete(emp.id)}
                                                className="w-9 h-9 rounded-xl hover:bg-red-50 hover:text-red-500 text-gray-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
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

            {/* Add/Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 border-none overflow-hidden w-[95vw] sm:w-[90vw] md:w-160 max-w-160 sm:max-w-160 mx-auto flex flex-col rounded-[3rem] shadow-2xl bg-white">
                    <div className="bg-gray-900 p-10 relative">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-sans text-white">{editMode ? "Edit Employee" : "New Employee"}</DialogTitle>
                            {/* <p className="text-gray-400 font-light mt-1">Enter details to {editMode ? "update" : "register"} a team member</p> */}
                        </DialogHeader>
                        <Button
                            variant="ghost"
                            className="absolute right-6 top-6 text-gray-400 hover:text-white"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-8 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="space-y-3 md:col-span-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                <Input
                                    required
                                    placeholder="e.g. John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="h-14 w-full bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                />
                            </div>
                            <div className="space-y-3 md:col-span-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                <Input
                                    required
                                    placeholder="e.g. Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="h-14 w-full bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                />
                            </div>
                            <div className="space-y-3 md:col-span-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <Input
                                    required
                                    type="tel"
                                    maxLength={10}
                                    placeholder="mobile number"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
                                    className="h-14 w-full bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                />
                            </div>
                            <div className="space-y-3 md:col-span-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Designation</label>
                                <Input
                                    required
                                    placeholder="e.g. Lead Architect"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    className="h-14 w-full bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                />
                            </div>
                            <div className="space-y-3 md:col-span-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(v: any) => setFormData({ ...formData, status: v })}
                                >
                                    <SelectTrigger className="h-14 w-full rounded-2xl bg-gray-50 border-gray-100 focus:ring-[#D4AF37]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-gray-100">
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3 md:col-span-4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Joining Date</label>
                                <Input
                                    required
                                    type="date"
                                    value={formData.joiningDate}
                                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                                    className="h-14 w-full bg-gray-50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-16 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-xl hover:translate-y-[-2px] transition-all mt-4">
                            {editMode ? "Update Information" : "Create Employee Profile"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-2xl max-w-md p-8 text-center bg-white">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
                        <Trash2 className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-sans">Are you sure?</DialogTitle>
                        <p className="text-gray-500 font-light mt-2">This action will permanently delete the employee record and cannot be undone.</p>
                    </DialogHeader>
                    <DialogFooter className="mt-8 flex gap-3 sm:justify-center">
                        <Button
                            variant="outline"
                            onClick={() => setConfirmDelete(null)}
                            className="h-14 px-8 rounded-2xl border-gray-100 hover:bg-gray-50 grow"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="h-14 px-8 bg-red-500 hover:bg-red-600 text-white rounded-2xl grow shadow-lg shadow-red-100"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

