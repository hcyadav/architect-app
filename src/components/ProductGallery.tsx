"use client";

import { useState } from "react";

interface ProductGalleryProps {
    mainImage: string;
    additionalImages?: string[];
    title: string;
}

export default function ProductGallery({ mainImage, additionalImages = [], title }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState(mainImage);
    const [showZoom, setShowZoom] = useState(false);
    const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
    const [bgPos, setBgPos] = useState("0% 0%");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        // Calculate mouse position relative to image
        let x = e.clientX - left;
        let y = e.clientY - top;

        // Constrain lens within bounds
        const lensWidth = 150;
        const lensHeight = 150;

        let lensX = x - lensWidth / 2;
        let lensY = y - lensHeight / 2;

        if (lensX < 0) lensX = 0;
        if (lensY < 0) lensY = 0;
        if (lensX > width - lensWidth) lensX = width - lensWidth;
        if (lensY > height - lensHeight) lensY = height - lensHeight;

        setLensPos({ x: lensX, y: lensY });

        // Calculate background position for the zoom window
        const percentX = (lensX / (width - lensWidth)) * 100;
        const percentY = (lensY / (height - lensHeight)) * 100;
        setBgPos(`${percentX}% ${percentY}%`);
    };

    // Combine images into one list for the bottom gallery
    const allImages = [mainImage, ...additionalImages];

    return (
        <div className="flex flex-col gap-6 relative">
            {/* Main Image Container */}
            <div
                className="aspect-square relative bg-white rounded-3xl overflow-hidden border border-gray-100 cursor-crosshair group shadow-sm"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
            >
                <img
                    src={activeImage}
                    alt={title}
                    className="object-cover w-full h-full"
                />

                {/* The Lens */}
                {showZoom && (
                    <div
                        className="absolute border border-gray-200 bg-white/20 backdrop-blur-[1px] pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.1)]"
                        style={{
                            width: "150px",
                            height: "150px",
                            left: `${lensPos.x}px`,
                            top: `${lensPos.y}px`,
                        }}
                    />
                )}

                {/* Roll over hint */}
                {/* {!showZoom && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold text-gray-400 border border-gray-100 uppercase tracking-widest pointer-events-none">
                        Hover to zoom
                    </div>
                )} */}
            </div>

            {/* Side Zoom Window (Portal-like feel) */}
            {showZoom && (
                <div
                    className="absolute left-[105%] top-0 w-full aspect-square hidden lg:block z-50 bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
                    style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundPosition: bgPos,
                        backgroundSize: "250%", // High magnification for clarity
                        backgroundRepeat: "no-repeat"
                    }}
                />
            )}

            {/* Thumbnails */}
            {additionalImages.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    {allImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveImage(img);
                            }}
                            className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img
                                ? "border-[#D4AF37] scale-105 shadow-md"
                                : "border-gray-50 hover:border-gray-200 grayscale-[0.2] hover:grayscale-0"
                                }`}
                        >
                            <img src={img} alt={`${title} ${index}`} className="object-cover w-full h-full" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
