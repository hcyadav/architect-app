"use client";

import { Building2, Award, Users, CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import { FadeIn } from "@/components/landing/FadeIn";

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-background">
            <FadeIn className="space-y-24">
                <div className="flex">
                    <BackButton />
                </div>
                
                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-100 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                        <Building2 className="w-3.5 h-3.5" />
                        Our Story
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight tracking-tight">
                        Crafting Spaces with <br />
                        <span className="text-orange-600">Timeless Elegance</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-500 font-light text-xl leading-relaxed">
                        At AESTHETICA, we believe that architecture is more than just buildings—it's about creating environments that inspire, comfort, and endure.
                    </p>
                </section>

                {/* Philosophy */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <FadeIn direction="left" className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                            alt="Interior Design"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </FadeIn>
                    <FadeIn direction="right" className="space-y-10">
                        <h2 className="text-4xl font-serif text-slate-900 leading-tight">Our Philosophy</h2>
                        <p className="text-slate-600 font-light text-lg leading-relaxed">
                            Founded with a vision to redefine interior and architectural standards, ABC DECORS (AESTHETICA) has grown into a premier studio known for its meticulous attention to detail and commitment to quality wooden and steel craftsmanship.
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
                                    <span className="font-serif text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20 border-y border-slate-100">
                    {[
                        { label: "Years Experience", value: "15+" },
                        { label: "Projects Completed", value: "250+" },
                        { label: "Expert Workers", value: "40+" },
                        { label: "Happy Clients", value: "100%" },
                    ].map((stat, i) => (
                        <FadeIn key={i} delayMs={i * 100} direction="up" className="text-center space-y-2">
                            <p className="text-4xl font-serif text-orange-600 leading-none">{stat.value}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">{stat.label}</p>
                        </FadeIn>
                    ))}
                </section>

                {/* Team/Mission */}
                <FadeIn direction="up">
                    <section className="bg-slate-900 text-white rounded-[5rem] p-12 md:p-32 text-center space-y-12 shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.1),transparent)] transition-opacity duration-1000 group-hover:opacity-70" />
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight relative z-10 italic">
                            "Architecture should speak of its time and place, <br className="hidden md:block" />
                            but yearn for timelessness."
                        </h2>
                        <div className="w-24 h-px bg-orange-600/50 mx-auto relative z-10" />
                        <p className="max-w-2xl mx-auto text-slate-400 font-light text-xl tracking-wide leading-relaxed relative z-10">
                            Our mission is to deliver bespoke designs that reflect the unique personality of our clients while maintaining the highest standards of integrity and aesthetic beauty.
                        </p>
                    </section>
                </FadeIn>
            </FadeIn>
        </div>
    );
}
