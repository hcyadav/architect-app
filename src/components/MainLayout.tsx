"use client";

import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { isOpen, toggle } = useSidebar();

    return (
        <div className="flex h-screen overflow-hidden w-screen max-w-full bg-white">
            <Sidebar />

            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${isOpen ? "md:ml-72" : "ml-0"}`}>
                {/* Header with Sidebar Toggle & Contact Info */}
                <header className="sticky top-0 z-[40] w-full h-20 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 lg:px-12">
                    <div className="flex items-center">
                        {!isOpen && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggle();
                                }}
                                className="p-3 bg-gray-900 text-white rounded-2xl shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center active:scale-95 group"
                                title="Open Menu"
                            >
                                <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        )}

                        {/* Brand name visible when sidebar is closed */}
                        {!isOpen && (
                            <div className="ml-6 flex flex-col">
                                <h1 className="text-xl font-serif tracking-tight text-gray-900 leading-none">AESTHETICA</h1>
                                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mt-1">Architectural Studio</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Info on the Right */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-10">
                        <a href="tel:+919876543210" className="flex items-center gap-2.5 text-gray-600 hover:text-[#D4AF37] transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:border-[#D4AF37]/30 transition-all">
                                <Phone className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold tracking-widest text-gray-500">+91 98765 43210</span>
                        </a>

                        <a href="mailto:info@studio.com" className="flex items-center gap-2.5 text-gray-600 hover:text-[#D4AF37] transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:border-[#D4AF37]/30 transition-all">
                                <Mail className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">info@studio.com</span>
                        </a>

                        <div className="flex items-center gap-2.5 text-gray-600 group cursor-default">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                            </div>
                            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Mumbai</span>
                        </div>
                    </div>

                    {/* Mobile Contact Icon (Simplified for phones) */}
                    <div className="flex md:hidden items-center gap-3">
                        <a href="tel:+919876543210" className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 active:bg-gray-50">
                            <Phone className="w-4 h-4" />
                        </a>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-white">
                    <div className="px-4 md:px-8 lg:px-12 pt-8 pb-12 min-h-screen bg-white">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
