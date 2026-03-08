import { Building2, Award, Users, CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-20 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BackButton />
            {/* Hero Section */}
            <section className="text-center space-y-6 pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-widest">
                    <Building2 className="w-3.5 h-3.5" />
                    Our Story
                </div>
                <h1 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight">
                    Crafting Spaces with <br />
                    <span className="text-[#D4AF37]">Timeless Elegance</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-500 font-light text-lg leading-relaxed">
                    At AESTHETICA, we believe that architecture is more than just buildings—it's about creating environments that inspire, comfort, and endure.
                </p>
            </section>

            {/* Philosophy */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                        alt="Interior Design"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="space-y-8">
                    <h2 className="text-3xl font-serif text-gray-900">Our Philosophy</h2>
                    <p className="text-gray-600 font-light leading-relaxed">
                        Founded with a vision to redefine interior and architectural standards, ABC DECORS (AESTHETICA) has grown into a premier studio known for its meticulous attention to detail and commitment to quality wooden and steel craftsmanship.
                    </p>
                    <div className="space-y-4">
                        {[
                            "Excellence in Wooden & Steel Furniture",
                            "Innovative Corporate Workspace Solutions",
                            "Sustainable Residential Architecture",
                            "Complete Turnkey Projects"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-800">
                                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-gray-100">
                {[
                    { label: "Years Experience", value: "15+" },
                    { label: "Projects Completed", value: "250+" },
                    { label: "Expert Workers", value: "40+" },
                    { label: "Happy Clients", value: "100%" },
                ].map((stat, i) => (
                    <div key={i} className="text-center space-y-1">
                        <p className="text-3xl font-serif text-[#D4AF37]">{stat.value}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Team/Mission */}
            <section className="bg-gray-900 text-white rounded-[4rem] p-12 md:p-20 text-center space-y-8 shadow-2xl">
                <h2 className="text-4xl font-serif leading-tight">
                    "Architecture should speak of its time and place, <br className="hidden md:block" />
                    but yearn for timelessness."
                </h2>
                <div className="w-16 h-px bg-[#D4AF37] mx-auto" />
                <p className="max-w-xl mx-auto text-gray-400 font-light tracking-wide">
                    Our mission is to deliver bespoke designs that reflect the unique personality of our clients while maintaining the highest standards of structural integrity and aesthetic beauty.
                </p>
            </section>
        </div>
    );
}
