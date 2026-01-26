'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';

interface ClockModuleProps {
  content: ModuleContent;
}

export function ClockModule({ content }: ClockModuleProps) {
  const { title = 'Local Time', customData } = content;
  const timezone = (customData?.timezone as string) || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatSeconds = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      second: '2-digit',
    }).slice(-2);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full h-full p-5 flex flex-col items-center justify-center">
      {/* Time display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-baseline gap-1"
      >
        <span className="text-4xl md:text-5xl font-light text-white tracking-tight tabular-nums">
          {formatTime(time)}
        </span>
        <motion.span
          key={formatSeconds(time)}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-neutral-500 tabular-nums"
        >
          :{formatSeconds(time)}
        </motion.span>
      </motion.div>

      {/* Date */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-neutral-400 mt-2"
      >
        {formatDate(time)}
      </motion.p>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-white/5"
      >
        <MapPin className="w-3 h-3 text-neutral-500" />
        <span className="text-xs text-neutral-400">{title}</span>
      </motion.div>
    </div>
  );
}
