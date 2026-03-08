import Link from "next/link";
import { Building2, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/5 bg-[#121212] text-white">
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/20">
                                <Building2 className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <span className="text-2xl font-serif tracking-tight text-white uppercase">Aesthetica</span>
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed max-w-xs">
                            Bespoke architectural creations and high-end interior designs. Crafting the future of living and working spaces.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all bg-white/5">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "About Us", href: "/about" },
                                { name: "Contact Us", href: "/contact" },
                                { name: "Products", href: "/" },
                                { name: "Premium Products", href: "/premium" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-gray-300 hover:text-[#D4AF37] transition-all font-light">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Business */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Business</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Corporate Work", href: "/corporate" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-gray-300 hover:text-[#D4AF37] transition-all font-light">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-light">
                        © {new Date().getFullYear()} ABC DECORS - AESTHETICA. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-light">
                        Made with passion for <span className="text-[#D4AF37] font-semibold">Excellence</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
