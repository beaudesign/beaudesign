'use client';

import { motion } from 'framer-motion';
import { ModuleContent } from '@/lib/grid-types';

interface ChartModuleProps {
  content: ModuleContent;
}

// Simple bar chart data
const defaultData = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 85 },
  { label: 'Wed', value: 45 },
  { label: 'Thu', value: 90 },
  { label: 'Fri', value: 70 },
  { label: 'Sat', value: 55 },
  { label: 'Sun', value: 80 },
];

export function ChartModule({ content }: ChartModuleProps) {
  const { title = 'Weekly Activity' } = content;
  const data = defaultData;
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full h-full p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-400">{title}</h3>
        <span className="text-xs text-neutral-500">Last 7 days</span>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-end justify-between gap-2">
        {data.map((item, i) => (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
            {/* Bar */}
            <div className="relative w-full flex justify-center" style={{ height: '100%' }}>
              <motion.div
                className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400"
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              />
            </div>
            {/* Label */}
            <span className="text-xs text-neutral-500">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Summary line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between"
      >
        <span className="text-xs text-neutral-500">Average</span>
        <span className="text-sm font-medium text-white">
          {Math.round(data.reduce((a, b) => a + b.value, 0) / data.length)}%
        </span>
      </motion.div>
    </div>
  );
}
