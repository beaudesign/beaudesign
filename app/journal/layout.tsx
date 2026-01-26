import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./journal.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Antikythera Journal | Philosophy of Planetary Computation",
  description:
    "A peer-reviewed journal dedicated to developing new interdisciplinary thought engaging the deepest philosophical and scientific complexities of computational technologies, biological and non-biological life, and intelligence at all scales.",
  keywords: [
    "planetary computation",
    "synthetic intelligence",
    "philosophy",
    "AI research",
    "recursive simulation",
    "hemispherical stacks",
    "planetary sapience",
  ],
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
    >
      {children}
    </div>
  );
}
