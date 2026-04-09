"use client";

import { Building2, CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import { FadeIn } from "@/components/landing/FadeIn";

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background">
            <FadeIn className="space-y-24">
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-100 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                        <Building2 className="w-3.5 h-3.5" />
                        Our Story
                    </div>
                    <h1 className="text-5xl md:text-7xl font-sans text-slate-900 leading-tight tracking-tight">
                        Elevate Your Living Space <br />
                        <span className="text-orange-600">With Aesthetica</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-500 font-light text-xl leading-relaxed">
                        At AESTHETICA, Everything your home needs—it&apos;s about designed, built, and delivered by us.
                    </p>
                </section>

                {/* Philosophy */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <FadeIn direction="left" className="relative aspect-4/5 rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                            alt="Interior Design"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </FadeIn>
                    <FadeIn direction="right" className="space-y-10">
                        <h2 className="text-4xl font-sans text-slate-900 leading-tight">Our Philosophy</h2>
                        <p className="text-slate-600 font-light text-lg leading-relaxed">
                            Founded with a vision is to be a trusted partner for complete interior solutions. We deliver end-to-end services, combining design, execution, and functionality under one roof. By focusing on quality, efficiency, and customer satisfaction, we create spaces that meet real needs and modern lifestyles.
                        </p>
                        <div className="space-y-6">
                            {[
                                "Excellence in Wooden & Steel Furniture",
                                "Innovative Corporate Workspace Solutions",
                                "Sustainable Residential Architecture",
                                "Complete Turnkey Projects"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-slate-800">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                                        <CheckCircle2 className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <span className="font-sans text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20 border-y border-slate-100">
                    {[
                        { label: "Years Experience", value: "25+" },
                        { label: "Projects Completed", value: "1500+" },
                        { label: "Cost Effective", value: "100%" },
                        { label: "Client Satisfaction", value: "100%" },
                    ].map((stat, i) => (
                        <FadeIn key={i} delayMs={i * 100} direction="up" className="text-center space-y-2">
                            <p className="text-4xl font-sans text-orange-600 leading-none">{stat.value}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">{stat.label}</p>
                        </FadeIn>
                    ))}
                </section>

                {/* Team/Mission */}
                <FadeIn direction="up">
                    <section className="bg-slate-900 text-white rounded-[5rem] p-12 md:p-32 text-center space-y-12 shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.1),transparent)] transition-opacity duration-1000 group-hover:opacity-70" />
                        <h2 className="text-4xl md:text-5xl font-sans leading-tight relative z-10 italic">
                            &quot;Crafted for today, <br className="hidden md:block" />
                            remembered for years.&quot;
                        </h2>
                        <div className="w-24 h-px bg-orange-600/50 mx-auto relative z-10" />
                        <p className="max-w-2xl mx-auto text-slate-400 font-light text-xl tracking-wide leading-relaxed relative z-10">
                            Our mission is to deliver complete home solutions that combine design, quality, and functionality — making every space beautiful, comfortable, and ready to live in.
                        </p>
                    </section>
                </FadeIn>
            </FadeIn>
        </div>
    );
}
