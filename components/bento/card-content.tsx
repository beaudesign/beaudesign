"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

// Hero Card Content
interface HeroContentProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function HeroContent({
  title,
  subtitle,
  description,
  className,
}: HeroContentProps) {
  return (
    <div className={cn("h-full flex flex-col justify-center p-8 md:p-12", className)}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-neutral-400 font-medium tracking-wide uppercase mb-3"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

// Project Card Content
interface ProjectContentProps {
  title: string;
  description?: string;
  tags?: string[];
  image?: string;
  className?: string;
}

export function ProjectContent({
  title,
  description,
  tags,
  image,
  className,
}: ProjectContentProps) {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      {image && (
        <div className="relative flex-1 overflow-hidden rounded-t-3xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
        </div>
      )}
      <div className={cn("p-6", image ? "mt-auto" : "h-full flex flex-col justify-end")}>
        {tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium text-neutral-300 bg-white/5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm md:text-base text-neutral-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// Image/Video Preview Card
interface MediaContentProps {
  src: string;
  alt?: string;
  type?: "image" | "video";
  overlay?: ReactNode;
  className?: string;
}

export function MediaContent({
  src,
  alt = "",
  type = "image",
  overlay,
  className,
}: MediaContentProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {type === "image" ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
      {overlay && (
        <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-neutral-900/80 to-transparent">
          {overlay}
        </div>
      )}
    </div>
  );
}

// Link Card Content (for social/resources)
interface LinkContentProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  showArrow?: boolean;
  className?: string;
}

export function LinkContent({
  icon,
  title,
  description,
  showArrow = true,
  className,
}: LinkContentProps) {
  return (
    <div
      className={cn(
        "h-full flex flex-col justify-between p-6 group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        {icon && (
          <div className="p-3 bg-white/5 rounded-2xl text-white">
            {icon}
          </div>
        )}
        {showArrow && (
          <motion.div
            className="text-neutral-500 group-hover:text-white transition-colors"
            whileHover={{ x: 2, y: -2 }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="text-lg font-semibold text-white group-hover:text-neutral-100 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        )}
      </div>
    </div>
  );
}

// Text Block Content (for about/philosophy)
interface TextBlockContentProps {
  title?: string;
  content: string | ReactNode;
  className?: string;
}

export function TextBlockContent({
  title,
  content,
  className,
}: TextBlockContentProps) {
  return (
    <div className={cn("h-full flex flex-col justify-center p-6 md:p-8", className)}>
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      )}
      <div className="text-neutral-400 leading-relaxed">
        {typeof content === "string" ? <p>{content}</p> : content}
      </div>
    </div>
  );
}

// Stats Card Content
interface StatContentProps {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export function StatContent({
  value,
  label,
  icon,
  className,
}: StatContentProps) {
  return (
    <div
      className={cn(
        "h-full flex flex-col items-center justify-center p-6 text-center",
        className
      )}
    >
      {icon && <div className="mb-3 text-neutral-400">{icon}</div>}
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-3xl md:text-4xl font-bold text-white"
      >
        {value}
      </motion.span>
      <span className="mt-2 text-sm text-neutral-500 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
