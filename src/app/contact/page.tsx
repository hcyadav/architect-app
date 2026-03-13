"use client";

import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-16 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <BackButton />

            {/* Header */}
            <section className="text-center space-y-4 pt-2">
                <h1 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight">Get in <span className="text-[#D4AF37]">Touch</span></h1>
                <p className="text-gray-500 font-light text-lg">We'd love to hear about your next architectural masterpiece.</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif text-gray-900">Office Details</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Our Studio</p>
                                    <p className="text-gray-700 font-light leading-relaxed">
                                        Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (Work)
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                                    <p className="text-gray-700 font-light">official@aesthetica.com</p>
                                </div>
                            </div>

                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                                    <p className="text-gray-700 font-light">+91 99999 88888</p>
                                </div>
                            </div>

                            <div className="flex gap-4 group border-t border-gray-50 pt-6">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                    <Clock className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Working Hours</p>
                                    <p className="text-gray-700 font-light">Mon - Sat: 10:00 AM - 7:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <Card className="lg:col-span-2 border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] bg-white rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 md:p-12 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-serif text-gray-900">Send a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</Label>
                                        <Input
                                            placeholder="Your name"
                                            className="h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Your email"
                                            className="h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message</Label>
                                    <Textarea
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="bg-gray-50/50 border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-all resize-none"
                                    />
                                </div>
                                <Button className="w-full h-16 bg-gray-900 hover:bg-black text-white rounded-[1.25rem] font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group">
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
