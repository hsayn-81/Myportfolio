"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const finish = () => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 700);
    };

    const minShowTime = 1800;
    const startedAt = Date.now();

    const tryFinish = () => {
      const elapsed = Date.now() - startedAt;
      const waitMore = Math.max(minShowTime - elapsed, 0);
      setTimeout(finish, waitMore);
    };

    if (document.readyState === "complete") {
      tryFinish();
    } else {
      window.addEventListener("load", tryFinish);
    }

    const fallback = setTimeout(finish, 5000);

    return () => {
      window.removeEventListener("load", tryFinish);
      clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute w-[480px] h-[480px] bg-[#c5a880]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center space-y-7">
        <div className="font-mono font-bold tracking-tight">
          <span className="text-2xl sm:text-3xl text-zinc-100">hsayn</span>
          <span className="text-2xl sm:text-3xl text-zinc-500 font-normal ml-1">portfolio</span>
        </div>

        <div className="mx-auto w-44 h-[2px] bg-white/10 overflow-hidden rounded-full">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#e5d2b8] to-transparent animate-loader" />
        </div>

        <p className="text-[10px] font-mono text-zinc-500 tracking-[0.28em] uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}