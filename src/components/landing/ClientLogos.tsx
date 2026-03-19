import Image from "next/image";

import { Container } from "@/components/landing/Container";
import { FadeIn } from "@/components/landing/FadeIn";
import { SectionHeader } from "@/components/landing/SectionHeader";

const logos = [
  { name: "Atelier One", src: "/next.svg" },
  { name: "Noble Structures", src: "/vercel.svg" },
  { name: "Urban Crest", src: "/globe.svg" },
  { name: "Stonefield", src: "/window.svg" },
  { name: "Arcline", src: "/file.svg" },
  { name: "Frame & Form", src: "/next.svg" },
];

export function ClientLogos() {
  return (
    <section>
      <Container>
        <FadeIn className="space-y-12 py-10">
          <SectionHeader
            align="center"
            label="Selected Clients"
            title="Trusted By Ambitious Brands"
            description="Long-term collaborations built on reliability, discretion, and design excellence."
          />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10 lg:grid-cols-6">
            {logos.map((logo, index) => (
              <FadeIn key={logo.name} delayMs={index * 40}>
                <div className="group flex h-24 items-center justify-center rounded-2xl bg-muted/35 p-4 transition-colors duration-300 ease-out hover:bg-muted/60">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={110}
                    height={28}
                    className="h-6 w-auto grayscale transition-all duration-300 ease-out group-hover:grayscale-0"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
