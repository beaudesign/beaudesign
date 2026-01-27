"use client";

import { cn } from "@/lib/utils";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

const getDirectionOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: distance };
  }
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  once = true,
  amount = 0.3,
  ...props
}: ScrollRevealProps) {
  const offset = getDirectionOffset(direction, distance);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animation wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.05,
  delayChildren = 0.2,
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Stagger child item (use inside StaggerContainer)
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 20,
}: StaggerItemProps) {
  const offset = getDirectionOffset(direction, distance);

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Hover scale wrapper
interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  yOffset?: number;
}

export function HoverScale({
  children,
  className,
  scale = 1.02,
  yOffset = -4,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        y: yOffset,
        transition: { duration: 0.2 },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
