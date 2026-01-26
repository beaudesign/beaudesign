'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';
import { cn } from '@/lib/utils';

interface SocialModuleProps {
  content: ModuleContent;
}

const socialLinks = [
  { icon: Github, label: 'GitHub', color: 'hover:bg-neutral-700', href: '#' },
  { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-600', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700', href: '#' },
  { icon: Mail, label: 'Email', color: 'hover:bg-emerald-600', href: '#' },
];

export function SocialModule({ content }: SocialModuleProps) {
  const { title = 'Connect' } = content;

  return (
    <div className="w-full h-full p-5 flex flex-col">
      {/* Header */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm font-medium text-neutral-400 mb-4"
      >
        {title}
      </motion.h3>

      {/* Social grid */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {socialLinks.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'flex flex-col items-center justify-center gap-2 rounded-xl',
              'bg-white/5 transition-all duration-300',
              social.color,
              'group'
            )}
          >
            <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-neutral-500 group-hover:text-white/80 transition-colors">
              {social.label}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Footer link */}
      <motion.a
        href="#"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors"
      >
        <span>View all links</span>
        <ExternalLink className="w-3 h-3" />
      </motion.a>
    </div>
  );
}
