'use client';

import { motion } from 'framer-motion';
import { Home, Search, Bell, Settings, User, Menu } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';
import { cn } from '@/lib/utils';

interface NavModuleProps {
  content: ModuleContent;
}

const navItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Search, label: 'Search' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
  { icon: User, label: 'Profile' },
];

export function NavModule({ content }: NavModuleProps) {
  const { title = 'atom63' } = content;

  return (
    <div className="w-full h-full p-4 flex items-center justify-between">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <span className="text-white font-semibold text-lg hidden sm:block">{title}</span>
      </motion.div>

      {/* Nav items - desktop */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hidden md:flex items-center gap-1"
      >
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className={cn(
              'p-2.5 rounded-xl transition-all',
              item.active
                ? 'bg-white/10 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            )}
          >
            <item.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </motion.nav>

      {/* Mobile menu */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
      >
        <Menu className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
