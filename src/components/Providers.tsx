"use client";

import { SessionProvider } from "next-auth/react";
import { ReactLenis } from "lenis/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactLenis root>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </ReactLenis>
    </SessionProvider>
  );
}
