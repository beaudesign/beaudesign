'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  X,
  Layout,
  Navigation,
  Type,
  Image,
  BarChart3,
  LineChart,
  Clock,
  Cloud,
  Share2,
  Play,
  Box,
  Grid3X3,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { useGridStore } from '@/lib/grid-store';
import { ModuleType, ModuleSize } from '@/lib/grid-types';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const moduleTypes: { type: ModuleType; icon: LucideIcon; label: string; defaultSize: ModuleSize }[] = [
  { type: 'hero', icon: Layout, label: 'Hero', defaultSize: 'large' },
  { type: 'nav', icon: Navigation, label: 'Navigation', defaultSize: 'wide' },
  { type: 'text', icon: Type, label: 'Text', defaultSize: 'medium' },
  { type: 'image', icon: Image, label: 'Image', defaultSize: 'medium' },
  { type: 'stats', icon: BarChart3, label: 'Stats', defaultSize: 'medium' },
  { type: 'chart', icon: LineChart, label: 'Chart', defaultSize: 'medium' },
  { type: 'clock', icon: Clock, label: 'Clock', defaultSize: 'small' },
  { type: 'weather', icon: Cloud, label: 'Weather', defaultSize: 'medium' },
  { type: 'social', icon: Share2, label: 'Social', defaultSize: 'small' },
  { type: 'embed', icon: Play, label: 'Embed', defaultSize: 'medium' },
  { type: 'custom', icon: Box, label: 'Custom', defaultSize: 'small' },
];

const defaultContent: Record<ModuleType, object> = {
  hero: {
    title: 'Welcome to your Dashboard',
    subtitle: 'Bento Grid',
    text: 'A modular, customizable dashboard inspired by modern portfolio systems.',
  },
  nav: { title: 'Bento' },
  text: {
    title: 'About',
    subtitle: 'Info',
    text: 'This is a modular bento-style dashboard. Drag modules to reposition, resize with handles, and right-click for more options.',
  },
  image: {
    title: 'Featured Image',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format',
  },
  stats: { title: 'Performance' },
  chart: { title: 'Weekly Activity' },
  clock: { title: 'Local Time' },
  weather: { title: 'San Francisco' },
  social: { title: 'Connect' },
  embed: {
    title: 'Featured Video',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  custom: { title: 'Custom Widget', text: 'Add your own content here' },
};

interface AddModuleToolbarProps {
  showGridLines: boolean;
  onToggleGridLines: () => void;
}

export function AddModuleToolbar({ showGridLines, onToggleGridLines }: AddModuleToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { addModule, clearModules, modules } = useGridStore();

  const handleAddModule = (type: ModuleType, defaultSize: ModuleSize) => {
    addModule(type, undefined, defaultSize, defaultContent[type]);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[480px] max-w-[90vw]"
          >
            <div className="bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-white">Add Module</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {moduleTypes.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.type}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleAddModule(item.type, item.defaultSize)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-3 rounded-xl',
                        'bg-white/5 hover:bg-white/10 transition-all',
                        'border border-transparent hover:border-white/10'
                      )}
                    >
                      <Icon className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs text-neutral-500">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toolbar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-2 py-2 bg-neutral-900/95 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl"
      >
        {/* Toggle grid lines */}
        <button
          onClick={onToggleGridLines}
          className={cn(
            'p-3 rounded-full transition-all',
            showGridLines
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-neutral-400 hover:text-white hover:bg-white/10'
          )}
          title="Toggle grid lines"
        >
          <Grid3X3 className="w-5 h-5" />
        </button>

        {/* Clear all */}
        <button
          onClick={clearModules}
          disabled={modules.length === 0}
          className="p-3 rounded-full text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          title="Clear all modules"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Reset to default */}
        <button
          onClick={() => {
            clearModules();
            // Add default modules
            setTimeout(() => {
              addModule('nav', { x: 1, y: 1 }, 'wide', defaultContent.nav);
              addModule('hero', { x: 1, y: 3 }, 'large', defaultContent.hero);
              addModule('clock', { x: 9, y: 3 }, 'small', defaultContent.clock);
              addModule('stats', { x: 9, y: 5 }, 'medium', defaultContent.stats);
              addModule('chart', { x: 1, y: 7 }, 'medium', defaultContent.chart);
              addModule('text', { x: 5, y: 7 }, 'medium', defaultContent.text);
              addModule('social', { x: 9, y: 9 }, 'small', defaultContent.social);
            }, 100);
          }}
          className="p-3 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
          title="Reset to default layout"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10" />

        {/* Add module button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 px-4 py-3 rounded-full transition-all',
            isOpen
              ? 'bg-blue-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          )}
        >
          <Plus className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-45')} />
          <span className="text-sm font-medium">Add Module</span>
        </button>
      </motion.div>
    </div>
  );
}
