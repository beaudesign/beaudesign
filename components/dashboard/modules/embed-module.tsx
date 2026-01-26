'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Maximize2 } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';
import { cn } from '@/lib/utils';

interface EmbedModuleProps {
  content: ModuleContent;
}

export function EmbedModule({ content }: EmbedModuleProps) {
  const { title, link, imageUrl } = content;
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  // Detect embed type from URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('/').pop()
        : new URLSearchParams(new URL(url).search).get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    if (url.includes('spotify.com')) {
      return url.replace('open.spotify.com', 'open.spotify.com/embed');
    }
    return url;
  };

  const embedUrl = link ? getEmbedUrl(link) : null;

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Thumbnail / Preview */}
      {!showEmbed && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setShowEmbed(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Background image or gradient */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || 'Preview'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

          {/* Play button */}
          <motion.div
            className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </motion.div>

          {/* Title */}
          {title && (
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-medium truncate">{title}</h3>
              {link && (
                <p className="text-xs text-neutral-400 truncate mt-1">
                  {new URL(link).hostname}
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Embedded content */}
      {showEmbed && embedUrl && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={embedUrl}
            className={cn(
              'w-full h-full border-0',
              !isLoaded && 'opacity-0'
            )}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />

          {/* Controls overlay */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => window.open(link, '_blank')}
              className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Fallback if no link */}
      {!link && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/50">
          <div className="text-center">
            <Play className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm text-neutral-500">No embed URL configured</p>
          </div>
        </div>
      )}
    </div>
  );
}
