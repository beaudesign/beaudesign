"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8",
        // Mobile: 1 column
        "grid-cols-1 gap-3",
        // Tablet: 6 columns
        "md:grid-cols-6 md:gap-3.5",
        // Desktop: 12 columns
        "xl:grid-cols-12 xl:gap-4",
        // Auto rows with minimum height
        "auto-rows-[minmax(120px,auto)]",
        className
      )}
    >
      {children}
    </div>
  );
}

// Card size variants
export type CardSize = "small" | "medium" | "large" | "hero";

interface BentoCardProps {
  children: ReactNode;
  size?: CardSize;
  className?: string;
  index?: number;
  href?: string;
  onClick?: () => void;
}

const sizeClasses: Record<CardSize, string> = {
  // Small: 3 cols, 2 rows
  small: "col-span-1 md:col-span-3 xl:col-span-3 row-span-2",
  // Medium: 4 cols, 3 rows
  medium: "col-span-1 md:col-span-3 xl:col-span-4 row-span-3",
  // Large: 6 cols, 4 rows
  large: "col-span-1 md:col-span-6 xl:col-span-6 row-span-4",
  // Hero: 12 cols, 3 rows
  hero: "col-span-1 md:col-span-6 xl:col-span-12 row-span-3",
};

export function BentoCard({
  children,
  size = "medium",
  className,
  index = 0,
  href,
  onClick,
}: BentoCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 },
      }}
      className={cn(
        // Base styles
        "relative overflow-hidden",
        "bg-neutral-900/60 backdrop-blur-lg",
        "border border-white/5",
        "rounded-3xl",
        // Hover effects
        "hover:border-white/10",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
        "transition-[border,box-shadow] duration-300",
        // Size classes
        sizeClasses[size],
        // Cursor
        (href || onClick) && "cursor-pointer",
        className
      )}
    >
      {children}
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  if (onClick) {
    return <button onClick={onClick}>{content}</button>;
  }

  return content;
}
