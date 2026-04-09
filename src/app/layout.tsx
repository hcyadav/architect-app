import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import MainLayout from "@/components/MainLayout";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwindcss-indicator";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });


const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Architect & Interior Design Platform",
  description: "Bespoke architectural creations and corporate designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, instrumentSerif.variable)}>
      <body
        className={`bg-[#F5F3EE] text-gray-900 antialiased overflow-x-hidden`}
      >
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
        <TailwindIndicator />
      </body>
    </html>
  );
}
