'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';
import { cn } from '@/lib/utils';

interface StatsModuleProps {
  content: ModuleContent;
}

export function StatsModule({ content }: StatsModuleProps) {
  const { title, stats = [] } = content;

  // Default stats if none provided
  const displayStats = stats.length > 0 ? stats : [
    { label: 'Total Views', value: '24.5K', trend: 'up', change: '+12%' },
    { label: 'Engagement', value: '68%', trend: 'up', change: '+5%' },
    { label: 'Revenue', value: '$12.4K', trend: 'down', change: '-3%' },
    { label: 'Users', value: '1,234', trend: 'neutral', change: '0%' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-emerald-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-neutral-400';
    }
  };

  return (
    <div className="w-full h-full p-5 flex flex-col">
      {title && (
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-neutral-400 mb-4"
        >
          {title}
        </motion.h3>
      )}

      <div className="flex-1 grid grid-cols-2 gap-4">
        {displayStats.slice(0, 4).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-xs text-neutral-500 mb-1">{stat.label}</span>
            <div className="flex items-end justify-between gap-2">
              <span className="text-xl font-semibold text-white">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </span>
              <div className="flex items-center gap-1">
                {getTrendIcon((stat as { trend?: string }).trend || 'neutral')}
                <span className={cn('text-xs', getTrendColor((stat as { trend?: string }).trend || 'neutral'))}>
                  {(stat as { change?: string }).change || '0%'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
