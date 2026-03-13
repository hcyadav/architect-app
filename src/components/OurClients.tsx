"use client";

import React from "react";

const clients = [
    {
        name: "Skyline Developers",
        industry: "Real Estate",
        logo: "/clients/skyline.png",
        link: "https://skyline.com",
    },
    {
        name: "Urban Vision",
        industry: "Urban Planning",
        logo: "/clients/urbanvision.png",
        link: "https://urbanvision.com",
    },
    {
        name: "Prestige Group",
        industry: "Luxury Living",
        logo: "/clients/prestige.png",
        link: "https://prestige.com",
    },
    {
        name: "Modern Spaces",
        industry: "Interior Design",
        logo: "/clients/modernspaces.png",
        link: "https://modernspaces.com",
    },
    {
        name: "Nexus Builders",
        industry: "Commercial",
        logo: "/clients/nexus.png",
        link: "https://nexus.com",
    },
    {
        name: "Apex Architecture",
        industry: "Structural",
        logo: "/clients/apex.png",
        link: "https://apex.com",
    },
];

export default function OurClients() {
    const loopClients = [...clients, ...clients]; // duplicate for infinite scroll

    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto sm:px-6">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em]">
                        Partnerships
                    </h2>

                    <h3 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight">
                        Our Trusted Clients
                    </h3>

                    <div className="w-12 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
                </div>

                {/* Carousel */}
                <div className="relative overflow-hidden">
                    <div className="flex w-max animate-scroll hover:[animation-play-state:paused] gap-10">

                        {loopClients.map((client, index) => (
                            <a
                                key={index}
                                href={client.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 min-w-[160px]"
                            >
                                <div className="relative mb-3">
                                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#FDFBF7] group-hover:border-[#D4AF37]/20 transition-colors duration-500 shadow-sm">
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                </div>

                                <p className="text-xs font-bold text-gray-900 tracking-wider text-center uppercase">
                                    {client.name}
                                </p>

                                <p className="text-[10px] text-gray-400 font-light tracking-wide text-center uppercase mt-1">
                                    {client.industry}
                                </p>
                            </a>
                        ))}

                    </div>
                </div>

            </div>

            {/* Animation Style */}
            <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
        </section>
    );
}