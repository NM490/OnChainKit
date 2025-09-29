"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import WalletSheet from "../features/WalletSheet";
import WalletAccount from "../features/WalletAccount";
import { useEffect, useState } from "react";

export default function Header() {
  const navBtns = [
    { text: "Home", url: "/", id: "home-btn" },
    { text: "About", url: "/about", id: "about-btn" },
  ];

  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
      <header className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left - Logo */}
        <a href="/" aria-label="Home" className="flex items-center gap-3 justify-between hover:opacity-90 transition">
          <div className="flex items-center gap-3 justify-between">
              <Image src="/favicon.ico" alt="Logo" width={65} height={65} />
            <div className="flex">
              <h1 className="flex text-lg font-semibold text-foreground">NFT Portfolio </h1>
              <p className="text-[10px] text-muted-foreground absolute translate-y-6">RAITE Project</p>
            </div>
          </div>
        </a>

        {/* Center - Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navBtns.map((btn) => (
            <a
              key={btn.id}
              href={btn.url}
              className="text-sm text-foreground hover:transition hover:text-brand underline-offset-4 hover:underline"
            >
              {btn.text}
            </a>
          ))}
        </nav>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle dark mode"
            className="rounded-md border border-border bg-card p-2 hover:bg-accent transition"
            onClick={() => setIsDark((v) => !v)}
          >
            {isDark ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </button>
          <WalletSheet />
          <WalletAccount />
        </div>
      </div>
    </header>
  );
}