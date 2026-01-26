'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';

interface HeroModuleProps {
  content: ModuleContent;
}

export function HeroModule({ content }: HeroModuleProps) {
  const { title = 'Welcome', subtitle, text, link } = content;

  return (
    <div className="relative w-full h-full p-6 flex flex-col justify-end overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />

      {/* Animated orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-400 font-medium">{subtitle || 'Dashboard'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight"
        >
          {title}
        </motion.h1>

        {text && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-neutral-400 text-base max-w-md mb-4"
          >
            {text}
          </motion.p>
        )}

        {link && (
          <motion.a
            href={link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors group"
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        )}
      </div>
    </div>
  );
}
