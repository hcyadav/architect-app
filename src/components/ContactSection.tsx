"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await axios.post("/api/quotation", { name, email, message });
            setSubmitted(true);
            toast.success("Message sent successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content & Info */}
                    <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-sans text-gray-900 tracking-tight">
                                Let's Build Your <br />
                                <span className="text-[#D4AF37]">Vision Together</span>
                            </h2>
                            <p className="text-gray-500 font-light text-lg max-w-lg leading-relaxed">
                                Ready to transform your space? Our team of architects and designers is here to bring your architectural masterpieces to life.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                    <MapPin className="w-6 h-6 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Our Studio</p>
                                    <p className="text-gray-900 font-medium font-sans text-lg leading-snug">
                                        Gala No.6, Shantidham Apartment, <br />
                                        Lokmanya Nagar, Thane
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                    <Mail className="w-6 h-6 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                                    <p className="text-gray-900 font-medium font-sans text-lg">official@aesthetica.com</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                    <Phone className="w-6 h-6 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                                    <p className="text-gray-900 font-medium font-sans text-lg">+91 99999 88888</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gray-100/50 rounded-full blur-3xl -z-10" />

                        <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-8 md:p-12 space-y-8">
                                {submitted ? (
                                    <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
                                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-sans text-gray-900">Message Received</h3>
                                            <p className="text-gray-500 font-light">Thank you for reaching out. Our team will get back to you shortly.</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => setSubmitted(false)}
                                            className="rounded-xl border-gray-200"
                                        >
                                            Send another inquiry
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-sans text-gray-900">Inquiry Form</h3>
                                            <p className="text-gray-500 font-light text-sm">Tell us about your project requirements.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                        placeholder="John Doe"
                                                        className="h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        placeholder="john@example.com"
                                                        className="h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message</Label>
                                                <Textarea
                                                    id="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                    placeholder="How can we help you?"
                                                    className="min-h-[150px] bg-gray-50/50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full h-16 bg-gray-900 hover:bg-black text-white rounded-[1.25rem] font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex gap-3 group disabled:opacity-70"
                                            >
                                                <Send className={`w-5 h-5 transition-transform ${loading ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                                                {loading ? "Sending..." : "Send Message"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
}
