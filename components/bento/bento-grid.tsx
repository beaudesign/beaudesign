'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GridEngine, AddModuleToolbar } from '@/components/dashboard';
import { useGridStore } from '@/lib/grid-store';

export function BentoGrid() {
  const [showGridLines, setShowGridLines] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { modules, addModule } = useGridStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && modules.length === 0) {
      addModule('nav', { x: 1, y: 1 }, 'wide', { title: 'Bento' });
      addModule('hero', { x: 1, y: 3 }, 'large', {
        title: 'Welcome to Bento',
        subtitle: 'Dashboard',
        text: 'A modular, bento-style dashboard interface. Drag modules to reposition, resize with handles, and right-click for options.',
      });
      addModule('clock', { x: 9, y: 3 }, 'small', { title: 'Local Time' });
      addModule('stats', { x: 9, y: 5 }, 'medium', { title: 'Performance' });
      addModule('chart', { x: 1, y: 7 }, 'medium', { title: 'Weekly Activity' });
      addModule('text', { x: 5, y: 7 }, 'medium', {
        title: 'About This Dashboard',
        subtitle: 'Info',
        text: 'Built with React, TailwindCSS, Framer Motion, and dnd-kit. Features include drag & drop, resizing, context menus, and persistent storage.',
      });
      addModule('weather', { x: 9, y: 9 }, 'medium', { title: 'San Francisco' });
      addModule('social', { x: 1, y: 10 }, 'small', { title: 'Connect' });
      addModule('image', { x: 3, y: 10 }, 'small', {
        title: 'Featured',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format',
      });
    }
  }, [isHydrated, modules.length, addModule]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500 text-sm">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none"
      >
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h1 className="text-white font-semibold">Bento Dashboard</h1>
              <p className="text-xs text-neutral-500">{modules.length} modules</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 px-3 py-1.5 rounded-full bg-white/5">
              {showGridLines ? 'Grid visible' : 'Grid hidden'}
            </span>
          </div>
        </div>
      </motion.header>

      <GridEngine showGridLines={showGridLines} className="pt-20" />

      <AddModuleToolbar
        showGridLines={showGridLines}
        onToggleGridLines={() => setShowGridLines(!showGridLines)}
      />
    </div>
  );
}
