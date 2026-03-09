"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Star, Quote } from "lucide-react";

interface ITestimonial {
    _id: string;
    clientName: string;
    role?: string;
    company?: string;
    content: string;
    rating: number;
    imageUrl?: string;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await axios.get("/api/testimonials");
                setTestimonials(res.data);
            } catch (error) {
                console.error("Error fetching testimonials", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="w-full py-24 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto"></div>
            </div>
        );
    }

    if (testimonials.length === 0) return null;

    return (
        <section className="bg-gray-50/50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight font-serif">
                        Client Feedback
                    </h2>
                    <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover what our clients say about their experience working with us on their architectural masterpieces.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="group bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating
                                            ? "fill-[#D4AF37] text-[#D4AF37]"
                                            : "text-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="relative">
                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-100 -z-0 group-hover:text-[#D4AF37]/10 transition-colors" />
                                <p className="relative z-10 text-gray-600 font-light leading-relaxed italic mb-8 wrap-break-word">
                                    "{testimonial.content}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                                {testimonial.imageUrl ? (
                                    <img
                                        src={testimonial.imageUrl}
                                        alt={testimonial.clientName}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#D4AF37] font-semibold text-lg">
                                        {testimonial.clientName[0]}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-semibold text-gray-900 leading-tight">
                                        {testimonial.clientName}
                                    </h4>
                                    {(testimonial.role || testimonial.company) && (
                                        <p className="text-xs text-gray-500 font-light mt-0.5">
                                            {[testimonial.role, testimonial.company]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
