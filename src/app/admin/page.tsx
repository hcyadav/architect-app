"use client";

import Link from "next/link";
import {
    Package,
    Briefcase,
    Users,
    ClipboardCheck,
    Home,
    Star,
    FileText
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/BackButton";

const adminModules = [
    {
        title: "Products",
        description: "Manage your main product catalog, categories, and inventory.",
        href: "/admin/products",
        icon: Package,
        color: "bg-blue-50 text-blue-600"
    },
    {
        title: "Best Products",
        description: "Select and highlight top-performing products for the homepage.",
        href: "/admin/best-products",
        icon: Star,
        color: "bg-yellow-50 text-yellow-600"
    },
    {
        title: "Portfolio",
        description: "Update your architectural portfolio and showcase your work.",
        href: "/admin/portfolio",
        icon: Briefcase,
        color: "bg-purple-50 text-purple-600"
    },
    {
        title: "Employees",
        description: "Add, remove, and manage your team of architects and staff.",
        href: "/admin/employees",
        icon: Users,
        color: "bg-green-50 text-green-600"
    },
    {
        title: "Attendance",
        description: "Track daily attendance, hourly work, and monthly summaries.",
        href: "/admin/attendance",
        icon: ClipboardCheck,
        color: "bg-[#D4AF37]/10 text-[#D4AF37]"
    },
    {
        title: "Quotation",
        description: "Review client inquiries and manage officially generated quotes with items.",
        href: "/quotation",
        icon: FileText,
        color: "bg-orange-50 text-orange-600"
    }
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50/50 p-8 space-y-12 animate-in fade-in duration-700">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-serif text-gray-900 italic">Admin Console</h1>
                            <p className="text-gray-500 font-light mt-1">Management hub for your architecture firm</p>
                        </div>
                    </div>
                    <Link href="/">
                        <Button variant="ghost" className="rounded-xl flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Main Site
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminModules.map((module) => (
                        <Link key={module.href} href={module.href}>
                            <Card className="h-full rounded-[2rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group overflow-hidden bg-white">
                                <CardHeader className="pb-2">
                                    <div className={`w-14 h-14 rounded-2xl ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                        <module.icon className="w-7 h-7" />
                                    </div>
                                    <CardTitle className="text-2xl font-serif text-gray-900 group-hover:text-[#D4AF37] transition-colors">{module.title}</CardTitle>
                                    <CardDescription className="text-gray-400 font-light leading-relaxed">
                                        {module.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-[#D4AF37] transition-colors">
                                        Access Module →
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { Button } from "@/components/ui/button";
