"use client";

import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/landing/FadeIn";

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background">
            <FadeIn className="space-y-16">
                <section className="text-center space-y-4">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Contact Us</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-sans text-slate-900 tracking-tight leading-tight">
                        Get in <span className="text-orange-600">Touch</span>
                    </h1>
                    <p className="text-slate-500 font-light text-xl max-w-2xl mx-auto">
                        Share your ideas with us — we’re ready to turn them into reality.
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-sans text-slate-900">Office Details</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm group-hover:border-orange-600/30 group-hover:bg-orange-50 transition-all duration-300">
                                        <MapPin className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Our Studio</p>
                                        <p className="text-slate-700 font-light leading-relaxed">
                                            Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (W)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm group-hover:border-orange-600/30 group-hover:bg-orange-50 transition-all duration-300">
                                        <Mail className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-slate-700 font-light">official@aesthetica.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm group-hover:border-orange-600/30 group-hover:bg-orange-50 transition-all duration-300">
                                        <Phone className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="text-slate-700 font-light">+91 99999 88888</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group border-t border-slate-100 pt-8">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm group-hover:border-orange-600/30 group-hover:bg-orange-50 transition-all duration-300">
                                        <Clock className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Working Hours</p>
                                        <p className="text-slate-700 font-light">Mon - Sat: 9:00 AM - 9:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="lg:col-span-2 border-none shadow-2xl shadow-slate-200/50 bg-white rounded-[3rem] overflow-hidden">
                        <CardContent className="p-8 md:p-16 space-y-10">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-sans text-slate-900">Send a Message</h2>
                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</Label>
                                            <Input
                                                placeholder="Your name"
                                                className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-600/20 focus-visible:border-orange-600 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</Label>
                                            <Input
                                                type="email"
                                                placeholder="Your email"
                                                className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-600/20 focus-visible:border-orange-600 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</Label>
                                        <Textarea
                                            rows={6}
                                            placeholder="How can we help you?"
                                            className="bg-slate-50 border-slate-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-600/20 focus-visible:border-orange-600 transition-all resize-none"
                                        />
                                    </div>
                                    <Button className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-lg shadow-xl shadow-orange-600/20 transition-all duration-300 flex items-center justify-center gap-3 group">
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </FadeIn>
        </div>
    );
}
