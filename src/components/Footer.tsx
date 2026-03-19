import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-0 border-t border-black/[0.03] bg-[#0E0E0E] pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-medium tracking-tight">
                Aesthetica<span className="text-orange-600">.</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Crafting premium architectural experiences and interior masterpieces since 2010. We believe in spaces that tell a story.
            </p>
            <div className="mt-8 flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-medium">Discover</h4>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link href="/products" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/premium" className="hover:text-white transition-colors">Premium Collection</Link></li>
              <li><Link href="/corporate" className="hover:text-white transition-colors">Corporate</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Latest Projects</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-medium">Company</h4>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-white/[0.03] p-8 border border-white/[0.05]">
              <h4 className="font-serif text-lg font-medium">Find out how to style</h4>
              <p className="mt-2 text-sm text-slate-400">Get expert interior design tips and exclusive collection updates.</p>
              <div className="mt-6 flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                />
                <button className="rounded-full bg-orange-600 px-6 py-2 text-sm font-semibold transition hover:bg-orange-700">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/5 pt-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Aesthetica. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-20 mb-0 flex justify-center opacity-[0.6] select-none pointer-events-none">
          <h2 className="text-[15vw] font-bold leading-none tracking-tighter text-white">AESTHETICA</h2>
        </div>
      </div>
    </footer>
  );
}

