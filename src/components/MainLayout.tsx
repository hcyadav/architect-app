"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  User as UserIcon,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const user = session?.user as { name?: string | null; image?: string | null; role?: string } | undefined;
  const role = user?.role ?? "user";
  const isAdmin = role === "admin";

  const navItems = [
    { href: "/", label: "Home" },
    // { href: "/products", label: "All Products" },
    // { href: "/residential", label: "Residential" },
    { href: "/residential", label: "Home Furniture" },
    { href: "/premium", label: "Premium Collections" },
    { href: "/corporate", label: "Corporate Works" },
    { href: "/portfolio", label: "Portfolio" },

    { href: "/contact", label: "Contact" },
  ];

  if (isAdmin) {
    navItems.push({ href: "/admin", label: "Admin" });
  }

  const adminItems = [
    { href: "/admin", label: "Admin Panel" },
    { href: "/admin/products", label: "Manage Products" },
    { href: "/admin/reviews", label: "Manage Reviews" },
    { href: "/admin/best-products", label: "Best Products" },
    { href: "/admin/portfolio", label: "Manage Portfolio" },
    { href: "/admin/employees", label: "Employees" },
    { href: "/admin/attendance", label: "Attendance" },
    { href: "/quotation", label: "Quotation" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMobileOpen(false);
      setProfileOpen(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      <header className="sticky top-0 z-50 border-b border-black/[0.03] bg-background/80 backdrop-blur-xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-serif text-2xl font-extrabold tracking-wider text-slate-900">
              Aesthetica<span className="text-orange-600">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all hover:text-orange-600 ${isActive(item.href) ? "text-orange-600" : "text-slate-500"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {!isAdmin && (
              <Link
                href="/products"
                className="hidden h-11 items-center gap-2 rounded-full bg-orange-600 px-6 text-[13px] font-semibold text-white transition-all hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-200 lg:inline-flex"
              >
                SHOP NOW
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M1 6H11M11 6L6 1M11 6L6 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>)}

            {status === "loading" ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-black/5" />
            ) : !session ? (
              <Button onClick={() => signIn("google", { callbackUrl: "/" })} variant={"default"} className="rounded-full py-5.5 px-6 cursor-pointer">
                Login
              </Button>
              // <button
              //   onClick={() => signIn("google", { callbackUrl: "/" })}
              //   className="inline-flex py-2 px-5 items-center justify-center rounded-full border border-black/5 bg-white text-slate-700 transition hover:border-black/10 hover:bg-slate-50"
              // >
              //   Login
              // </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-white transition hover:border-black/10"
                >
                  {user?.image ? (
                    <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon className="h-4 w-4 text-slate-500" />
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 transform rounded-2xl border border-black/5 bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="mb-2 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-slate-900">{user?.name || "User"}</p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        {isAdmin ? "Administrator" : "Client"}
                      </p>
                    </div>
                    <div className="h-px bg-black/[0.03] mb-2" />
                    <div className="space-y-1">
                      {isAdmin && (
                        <div className="space-y-1 py-1">
                          <p className="px-3 text-[10px] uppercase tracking-wider text-slate-400">Administration</p>
                          {adminItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                              {item.label}
                            </Link>
                          ))}
                          <div className="h-px bg-black/[0.03] my-2" />
                        </div>
                      )}
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-slate-700 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        {mobileOpen && (
          <div className="border-t border-black/5 bg-[#F5F3EE] px-4 pb-4 pt-3 md:hidden">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2 text-sm transition-colors ${isActive(item.href)
                    ? "bg-[#111827] text-white"
                    : "text-slate-700 hover:bg-white hover:text-slate-900"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {isAdmin && (
              <div className="mt-3 space-y-1 rounded-xl border border-black/10 bg-white p-2">
                <p className="px-2 pb-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">Admin</p>
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-100 px-2 py-2 text-sm text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}

            {session && !isAdmin && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            )}

            {!session && (
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-3 py-2 text-sm font-medium text-white"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <LayoutDashboard className="h-4 w-4" />
                Open Admin Dashboard
              </Link>
            )}
          </div>
        )}

      </header>

      <main className="min-h-[calc(100vh-5rem)]">{children}</main>
      <Footer />
    </div>
  );
}
