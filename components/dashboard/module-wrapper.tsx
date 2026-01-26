'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Resizable } from 're-resizable';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Module, GRID_CONFIG } from '@/lib/grid-types';
import { useGridStore } from '@/lib/grid-store';
import { ModuleContextMenu } from './context-menu';
import { cn } from '@/lib/utils';

interface ModuleWrapperProps {
  module: Module;
  children: React.ReactNode;
  onEdit?: () => void;
}

export function ModuleWrapper({ module, children, onEdit }: ModuleWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    selectedModuleId,
    setSelectedModule,
    resizeModule,
    setDragging,
    setResizing,
  } = useGridStore();

  const isSelected = selectedModuleId === module.id;
  const isDraggable = !module.locked && !isResizing;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: module.id,
    disabled: !isDraggable,
    data: { module },
  });

  const handleResizeStop = useCallback(
    (_e: MouseEvent | TouchEvent, _direction: string, _ref: HTMLElement, delta: { width: number; height: number }) => {
      const { gap, rowHeight } = GRID_CONFIG;
      const colWidth = (wrapperRef.current?.parentElement?.clientWidth || 1200) / 12;

      const newW = Math.round(delta.width / (colWidth + gap)) + module.position.w;
      const newH = Math.round(delta.height / (rowHeight + gap)) + module.position.h;

      resizeModule(module.id, Math.max(1, newW), Math.max(1, newH));
      setIsResizing(false);
      setResizing(false);
    },
    [module.id, module.position.w, module.position.h, resizeModule, setResizing]
  );

  const style: React.CSSProperties = {
    gridColumn: `${module.position.x} / span ${module.position.w}`,
    gridRow: `${module.position.y} / span ${module.position.h}`,
    zIndex: isDragging ? 100 : module.zIndex,
    ...(module.isSticky && {
      position: 'sticky' as const,
      top: 32,
    }),
  };

  const dragStyle = transform
    ? {
        transform: CSS.Transform.toString(transform),
      }
    : undefined;

  return (
    <ModuleContextMenu
      moduleId={module.id}
      isSticky={module.isSticky}
      isLocked={module.locked}
      onEdit={onEdit}
    >
      <motion.div
        ref={(el) => {
          setNodeRef(el);
          if (el) (wrapperRef as React.MutableRefObject<HTMLDivElement>).current = el;
        }}
        style={{ ...style, ...dragStyle }}
        className={cn(
          'relative group',
          isDragging && 'cursor-grabbing',
          module.locked && 'cursor-default'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setSelectedModule(module.id)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: isDragging ? 1.03 : 1,
          boxShadow: isDragging
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : isHovered
            ? '0 10px 40px -10px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px -5px rgba(0, 0, 0, 0.2)',
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        layout
      >
        <Resizable
          size={{ width: '100%', height: '100%' }}
          enable={
            module.locked
              ? {}
              : {
                  top: false,
                  right: true,
                  bottom: true,
                  left: false,
                  topRight: false,
                  bottomRight: true,
                  bottomLeft: false,
                  topLeft: false,
                }
          }
          onResizeStart={() => {
            setIsResizing(true);
            setResizing(true);
          }}
          onResizeStop={handleResizeStop}
          handleStyles={{
            right: { width: 8, right: -4, cursor: 'ew-resize' },
            bottom: { height: 8, bottom: -4, cursor: 'ns-resize' },
            bottomRight: { width: 16, height: 16, right: -4, bottom: -4, cursor: 'nwse-resize' },
          }}
          handleClasses={{
            right: 'opacity-0 group-hover:opacity-100 transition-opacity',
            bottom: 'opacity-0 group-hover:opacity-100 transition-opacity',
            bottomRight: 'opacity-0 group-hover:opacity-100 transition-opacity',
          }}
        >
          {/* Module content container */}
          <div
            className={cn(
              'w-full h-full rounded-2xl overflow-hidden',
              'bg-neutral-900/40 backdrop-blur-xl',
              'border transition-all duration-200',
              isSelected
                ? 'border-blue-500/50 ring-2 ring-blue-500/20'
                : 'border-white/10 hover:border-white/20',
              isDragging && 'ring-2 ring-white/20'
            )}
          >
            {/* Drag handle */}
            {!module.locked && (
              <div
                {...attributes}
                {...listeners}
                onMouseDown={() => setDragging(true)}
                onMouseUp={() => setDragging(false)}
                className={cn(
                  'absolute top-2 left-2 p-1.5 rounded-lg',
                  'bg-white/5 hover:bg-white/10',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  'cursor-grab active:cursor-grabbing z-10'
                )}
              >
                <GripVertical className="w-4 h-4 text-white/40" />
              </div>
            )}

            {/* Sticky indicator */}
            {module.isSticky && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 z-10">
                <span className="text-xs text-amber-400 font-medium">Pinned</span>
              </div>
            )}

            {/* Lock indicator */}
            {module.locked && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-neutral-500/20 border border-neutral-500/30 z-10">
                <span className="text-xs text-neutral-400 font-medium">Locked</span>
              </div>
            )}

            {/* Actual module content */}
            <div className="w-full h-full">{children}</div>
          </div>

          {/* Resize handles visual indicators */}
          {!module.locked && (
            <>
              <div
                className={cn(
                  'absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full',
                  'bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity'
                )}
              />
              <div
                className={cn(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full',
                  'bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity'
                )}
              />
              <div
                className={cn(
                  'absolute bottom-1 right-1 w-3 h-3 rounded-sm',
                  'bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity'
                )}
              />
            </>
          )}
        </Resizable>
      </motion.div>
    </ModuleContextMenu>
  );
}
