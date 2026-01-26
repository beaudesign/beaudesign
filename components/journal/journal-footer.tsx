"use client";

import Link from "next/link";

const footerLinks = {
  journal: [
    { href: "/journal/articles", label: "Articles" },
    { href: "/journal/themes", label: "Themes" },
    { href: "/journal/contributors", label: "Contributors" },
    { href: "/journal/archive", label: "Archive" },
  ],
  research: [
    { href: "/research/computation", label: "Planetary Computation" },
    { href: "/research/intelligence", label: "Synthetic Intelligence" },
    { href: "/research/simulation", label: "Recursive Simulation" },
    { href: "/research/stacks", label: "Hemispherical Stacks" },
    { href: "/research/sapience", label: "Planetary Sapience" },
  ],
  about: [
    { href: "/about", label: "About Antikythera" },
    { href: "/about/editorial", label: "Editorial Board" },
    { href: "/about/submissions", label: "Submissions" },
    { href: "/about/contact", label: "Contact" },
  ],
};

export function JournalFooter() {
  return (
    <footer className="bg-journal-black border-t border-journal">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/journal" className="flex items-center gap-3 mb-6">
              {/* Logo */}
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
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-journal-white">
                  Antikythera
                </span>
                <span className="block text-xs text-journal-subtle font-mono uppercase tracking-wider">
                  Journal
                </span>
              </div>
            </Link>

            <p className="text-sm text-journal-muted leading-relaxed mb-6">
              A peer-reviewed journal for the philosophy of planetary
              computation, published in collaboration with MIT Press.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-journal-muted hover:text-journal-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-journal-muted hover:text-journal-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-journal-muted hover:text-journal-white transition-colors"
                aria-label="RSS"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16" />
                  <circle cx="5" cy="19" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Journal links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-journal-white mb-4">
              Journal
            </h3>
            <ul className="space-y-3">
              {footerLinks.journal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-journal-muted hover:text-journal-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research themes */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-journal-white mb-4">
              Research Themes
            </h3>
            <ul className="space-y-3">
              {footerLinks.research.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-journal-muted hover:text-journal-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-journal-white mb-4">
              About
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-journal-muted hover:text-journal-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter signup */}
            <div className="mt-8">
              <h3 className="text-xs font-mono uppercase tracking-wider text-journal-white mb-3">
                Newsletter
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 text-sm bg-journal-surface border border-journal rounded text-journal-white placeholder:text-journal-subtle focus:outline-none focus:border-journal-accent/50"
                />
                <button className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-journal-accent text-journal-black rounded hover:bg-journal-accent-dim transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-journal">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-journal-subtle">
              <span>&copy; 2025 Antikythera Program</span>
              <span className="hidden md:inline">·</span>
              <span>Published with MIT Press</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <Link
                href="/privacy"
                className="text-journal-subtle hover:text-journal-muted transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-journal-subtle hover:text-journal-muted transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="/accessibility"
                className="text-journal-subtle hover:text-journal-muted transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
