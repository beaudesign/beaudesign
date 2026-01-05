import type { Metadata } from "next";
import "./globals.css";

// Note: IBM Plex fonts are loaded via CSS @import in globals.css
// This avoids build-time font fetching issues in restricted environments

export const metadata: Metadata = {
  title: "Relay - Interactive AI Product",
  description: "An interactive AI product similar to Claude Imagine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
