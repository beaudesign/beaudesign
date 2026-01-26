'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';

interface TextModuleProps {
  content: ModuleContent;
}

export function TextModule({ content }: TextModuleProps) {
  const { title, subtitle, text, link } = content;

  return (
    <div className="w-full h-full p-5 flex flex-col">
      {subtitle && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium text-blue-400 uppercase tracking-wider mb-2"
        >
          {subtitle}
        </motion.span>
      )}

      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg font-semibold text-white mb-2 leading-tight"
        >
          {title}
        </motion.h3>
      )}

      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-neutral-400 leading-relaxed flex-1"
        >
          {text}
        </motion.p>
      )}

      {link && (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Learn more</span>
          <ExternalLink className="w-3 h-3" />
        </motion.a>
      )}
    </div>
  );
}
