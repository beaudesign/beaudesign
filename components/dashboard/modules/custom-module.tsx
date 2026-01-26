'use client';

import { motion } from 'framer-motion';
import { Box } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';

interface CustomModuleProps {
  content: ModuleContent;
}

export function CustomModule({ content }: CustomModuleProps) {
  const { title = 'Custom Module', text } = content;

  return (
    <div className="w-full h-full p-5 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4"
      >
        <Box className="w-6 h-6 text-purple-400" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-medium text-white text-center mb-2"
      >
        {title}
      </motion.h3>

      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-neutral-500 text-center"
        >
          {text}
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-neutral-600 mt-4"
      >
        Drag to reposition • Right-click for options
      </motion.p>
    </div>
  );
}
