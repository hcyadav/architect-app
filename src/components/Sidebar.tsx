"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Building2, Gem, FileText, User as UserIcon, LogOut, LogIn, LayoutDashboard, X, Star } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { isOpen, close } = useSidebar();

  const isLoading = status === "loading";

  // @ts-ignore
  const role = session?.user?.role;

  const isActive = (path: string) => pathname === path;

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      close();
    }
  }, [pathname, close]);

  const navItems = [
    { name: "Products", href: "/", icon: Home },
    { name: "Premium Products", href: "/premium", icon: Gem },
    { name: "Corporate Work", href: "/corporate", icon: Building2 },
    { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  ];

  const adminItems = [
    { name: "Quotation", href: "/quotation", icon: FileText },
    { name: "Manage Products", href: "/admin/products", icon: LayoutDashboard },
    { name: "Best Products", href: "/admin/best-products", icon: Star },
    { name: "Manage Portfolio", href: "/admin/portfolio", icon: Briefcase },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
        w-72 h-full bg-white border-r border-[#EEEEEE] flex flex-col
        shadow-[4px_0_24px_rgba(0,0,0,0.06)] z-50
      `}>
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6">
          <div className="mt-8">
            <div className="flex items-center justify-between mb-12">
              <div className="flex flex-col">
                <h1 className="text-2xl font-light tracking-wide text-gray-900 leading-tight">
                  AESTHETICA
                </h1>
                <p className="text-[10px] text-gray-500 mt-1 tracking-[0.2em] uppercase font-bold">
                  Architectural Studio
                </p>
              </div>

              {/* Close Button Inside Sidebar */}
              <button
                onClick={close}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1.5 pb-8">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Category</p>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.href)
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] font-semibold"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}

              {role === "admin" && (
                <>
                  <div className="pt-8 pb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Administrator</p>
                  </div>
                  {adminItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.href)
                        ? "bg-[#D4AF37]/10 text-[#D4AF37] font-semibold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Fixed Bottom Area */}
        <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : session ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 px-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 p-0.5">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="User" />
                    ) : (
                      <UserIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="overflow-hidden text-left">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {session.user?.name}
                  </p>
                  <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{role}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-500 hover:text-red-600 transition-all w-full rounded-xl hover:bg-red-50 group"
              >
                <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: '/' })}
              className="flex items-center justify-center space-x-2 w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
            >
              <LogIn className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide">Log In with Google</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
