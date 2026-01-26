"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/journal", label: "Home" },
  { href: "/journal/articles", label: "Articles" },
  { href: "/journal/themes", label: "Themes" },
  { href: "/journal/contributors", label: "Contributors" },
  { href: "/journal/about", label: "About" },
];

export function JournalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-journal-black/90 backdrop-blur-md border-b border-journal"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/journal" className="flex items-center gap-3 group">
            {/* Antikythera symbol */}
            <div className="relative w-10 h-10">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-journal-white/30"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-journal-accent/50"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-journal-white/50"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="2"
                  fill="currentColor"
                  className="text-journal-accent"
                />
                {/* Gear teeth */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="20"
                    y1="2"
                    x2="20"
                    y2="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-journal-white/30"
                    transform={`rotate(${angle} 20 20)`}
                  />
                ))}
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-journal-white tracking-wide group-hover:text-journal-accent transition-colors">
                Antikythera
              </span>
              <span className="text-xs text-journal-subtle font-mono uppercase tracking-wider">
                Journal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="p-2 text-journal-muted hover:text-journal-white transition-colors"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button className="journal-button text-xs py-2 px-4">
              Subscribe
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-journal-muted hover:text-journal-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-journal pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-journal">
                <button className="journal-button text-xs py-2 px-4 flex-1">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
