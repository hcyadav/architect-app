import prisma from "@/lib/prisma";
import { MapPin, Calendar, MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/landing/FadeIn";

export default async function PortfolioPage() {
    const [projects, testimonials] = await Promise.all([
        prisma.portfolio.findMany({
            orderBy: { createdAt: 'desc' }
        }),
        prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        }),
    ]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-background">
            <FadeIn className="space-y-24" direction="none">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Our Work</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight tracking-tight">
                      Our Portfolio
                    </h1>
                    <p className="text-slate-500 text-xl font-light leading-relaxed">
                        Exploring the boundaries of architecture and design through our most significant works.
                        Each project tells a story of innovation and precision.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project, i) => (
                        <FadeIn key={project.id} delayMs={i * 100} direction="up" className="group">
                            <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden bg-slate-100 mb-8 shadow-sm border border-slate-50">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <p className="text-white text-sm font-light leading-relaxed line-clamp-4">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                            <div className="px-4 space-y-3">
                                <h3 className="text-2xl font-serif text-slate-900 group-hover:text-orange-600 transition-colors">{project.title}</h3>
                                <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600/60">
                                    {project.location && (
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3" />
                                            {(project as any).location}
                                        </span>
                                    )}
                                    {project.completionDate && (
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {(project as any).completionDate}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center pt-12">
                    <FadeIn direction="up">
                        <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                            <h3 className="text-4xl font-serif text-slate-900">Inspired by our work?</h3>
                            <p className="text-slate-500 max-w-xl mx-auto text-lg font-light">
                                Let's collaborate to build your dream space. Our team is ready to bring your vision to life.
                            </p>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-12 py-5 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all text-lg"
                            >
                                START A PROJECT
                                <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </FadeIn>
        </div>
    );
}
