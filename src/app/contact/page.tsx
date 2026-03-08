import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function ContactPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-16 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BackButton />
            {/* Header */}
            <section className="text-center space-y-4 pt-2">
                <h1 className="text-4xl md:text-5xl font-serif text-gray-900">Get in Touch</h1>
                <p className="text-gray-500 font-light text-lg">We'd love to hear about your next masterpiece.</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif text-gray-900">Office Details</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Our Studio</p>
                                    <p className="text-gray-700 font-light leading-relaxed">
                                        Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (Work)
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                                    <p className="text-gray-700 font-light">official@aesthetica.com</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                                    <p className="text-gray-700 font-light">+91 99999 88888</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Working Hours</p>
                                    <p className="text-gray-700 font-light">Mon - Sat: 10:00 AM - 7:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Placeholder/Visual */}
                <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif text-gray-900">Send a Message</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email</label>
                                <input type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all" placeholder="Your email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
                            <textarea rows={5} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
                            <Send className="w-5 h-5" />
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
