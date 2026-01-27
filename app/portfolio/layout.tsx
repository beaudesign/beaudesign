import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "A bento-style portfolio showcasing creative development work, design systems, and digital experiences.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
