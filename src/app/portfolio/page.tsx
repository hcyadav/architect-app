import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import Testimonial from "@/models/Testimonial";
import { Star, MapPin, Calendar, Quote } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
    await connectToDatabase();
    const [projects, testimonials] = await Promise.all([
        Portfolio.find({}).sort({ createdAt: -1 }).lean(),
        Testimonial.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 bg-white">
            {/* Hero Section */}
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">Our Portfolio</h1>
                <p className="text-gray-500 text-lg font-light leading-relaxed">
                    Exploring the boundaries of architecture and design through our most significant works.
                    Each project tells a story of innovation, precision, and client vision.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
                {(projects as any[]).map((project) => (
                    <div key={project._id} className="group cursor-default">
                        <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden bg-gray-100 mb-6 shadow-sm border border-gray-50">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <p className="text-sm font-medium line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <div className="px-2">
                            <h3 className="text-2xl font-serif text-gray-900 mb-3">{project.title}</h3>
                            <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                                {project.location && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {project.location}
                                    </span>
                                )}
                                {project.completionDate && (
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {project.completionDate}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Testimonials Section */}
            {/* <div className="bg-[#FDFBF7] rounded-[3rem] p-12 md:p-24 border border-[#EEEEEE]">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Client Feedback</h2>
                    <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(testimonials as any[]).map((testimonial) => (
                        <div key={testimonial._id} className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-[#F5F5F5] relative">
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-[#D4AF37]/10" />
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 italic leading-relaxed mb-8 font-light break-words">
                                "{testimonial.content}"
                            </p>
                            <div>
                                <h4 className="font-serif text-lg text-gray-900">{testimonial.clientName}</h4>
                                <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mt-1">
                                    {testimonial.role || "Verified Client"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* CTA Section */}
            <div className="mt-32 text-center">
                <h3 className="text-2xl font-serif text-gray-900 mb-6">Inspired by our work?</h3>
                <Link
                    href="/"
                    className="inline-flex items-center px-10 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg text-lg"
                >
                    View Our Collections
                </Link>
            </div>
        </div>
    );
}
