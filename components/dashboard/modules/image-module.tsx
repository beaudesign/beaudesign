'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ExternalLink } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';
import { cn } from '@/lib/utils';

interface ImageModuleProps {
  content: ModuleContent;
}

export function ImageModule({ content }: ImageModuleProps) {
  const { title, imageUrl, link } = content;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const Wrapper = link ? motion.a : motion.div;
  const wrapperProps = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'relative w-full h-full overflow-hidden group',
        link && 'cursor-pointer'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Image or placeholder */}
      {imageUrl && !imageError ? (
        <>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
          )}
          <motion.img
            src={imageUrl}
            alt={title || 'Image'}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500',
              'group-hover:scale-105',
              !imageLoaded && 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/50">
          <ImageIcon className="w-12 h-12 text-neutral-600" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Title overlay */}
      {title && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform"
          initial={false}
        >
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">{title}</span>
            {link && <ExternalLink className="w-4 h-4 text-white/70" />}
          </div>
        </motion.div>
      )}
    </Wrapper>
  );
}
