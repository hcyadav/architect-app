"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { MoveRight } from "lucide-react";

const images = [
  "/uploads/1772704211002-sofa1.jpg",
  "/uploads/1772704211002-sofa1.jpg", // Replace with other images if available
  "/uploads/1772704211002-sofa1.jpg",
];

export function ExperienceSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <FadeIn>
              <h2 className="font-serif text-5xl font-medium leading-tight text-slate-900 md:text-6xl">
                We Provide You The <br /> Best Experience
              </h2>
              <p className="mt-8 text-lg text-slate-500 max-w-lg leading-relaxed">
                With our mature experience, several honors, and numerous items sold, we feel we can always deliver the finest results and service to our devoted clients.
              </p>
            </FadeIn>

            <div className="grid grid-cols-3 gap-8">
               {[
                 { label: "Years experience", val: 13 },
                 { label: "Awards gained", val: 54 },
                 { label: "Furnitures sold", val: 1203 },
               ].map((stat, i) => (
                 <FadeIn key={i} delayMs={i * 100}>
                   <div className="space-y-2">
                     <p className="font-sans text-4xl font-bold text-orange-600">
                       {stat.val}
                     </p>
                     <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                       {stat.label}
                     </p>
                   </div>
                 </FadeIn>
               ))}
            </div>

            <FadeIn delayMs={400}>
              <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-slate-50">
                Learn more
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </FadeIn>
          </div>

          <div className="relative">
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-[3rem] bg-orange-50 opacity-50 blur-3xl" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full max-w-md ml-auto"
            >
              <div className="absolute -top-6 -left-6 h-full w-full rounded-[2.5rem] bg-orange-100/30" />
              
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[index]}
                      alt="Experience"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Overlapping Floating Badge */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-10 -left-10 rounded-[2rem] bg-white p-6 shadow-xl border border-slate-50"
              >
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Premium quality</p>
                 <p className="mt-1 font-serif text-xl font-medium text-slate-900">Certified Design</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
