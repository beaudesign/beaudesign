'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useGridStore } from '@/lib/grid-store';
import { GRID_CONFIG, Module } from '@/lib/grid-types';
import { ModuleWrapper } from './module-wrapper';
import { ModuleRenderer } from './module-renderer';
import { cn } from '@/lib/utils';

interface GridEngineProps {
  className?: string;
  showGridLines?: boolean;
}

export function GridEngine({ className, showGridLines = false }: GridEngineProps) {
  const { modules, moveModule, setDragging, gridColumns, setGridColumns } = useGridStore();
  const [activeDragModule, setActiveDragModule] = useState<Module | null>(null);
  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);

  // Configure sensors with activation constraints
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // Handle responsive grid columns
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < GRID_CONFIG.breakpoints.mobile) {
        setGridColumns(1);
      } else if (width < GRID_CONFIG.breakpoints.tablet) {
        setGridColumns(6);
      } else {
        setGridColumns(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setGridColumns]);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const module = modules.find((m) => m.id === event.active.id);
      if (module) {
        setActiveDragModule(module);
        setDragging(true);
      }
    },
    [modules, setDragging]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragModule(null);
      setDragging(false);

      if (!gridRef) return;

      const { active, delta } = event;
      const module = modules.find((m) => m.id === active.id);
      if (!module) return;

      // Calculate grid cell dimensions
      const gridRect = gridRef.getBoundingClientRect();
      const cellWidth = (gridRect.width - (gridColumns - 1) * GRID_CONFIG.gap) / gridColumns;
      const cellHeight = GRID_CONFIG.rowHeight;

      // Calculate new position based on delta
      const deltaColumns = Math.round(delta.x / (cellWidth + GRID_CONFIG.gap));
      const deltaRows = Math.round(delta.y / (cellHeight + GRID_CONFIG.gap));

      const newX = module.position.x + deltaColumns;
      const newY = module.position.y + deltaRows;

      moveModule(module.id, newX, newY);
    },
    [gridRef, modules, gridColumns, moveModule, setDragging]
  );

  // Calculate grid rows needed
  const maxRow = Math.max(
    ...modules.map((m) => m.position.y + m.position.h),
    8 // Minimum 8 rows
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={setGridRef}
        className={cn(
          'relative w-full min-h-screen p-6',
          'bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950',
          className
        )}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gridAutoRows: `${GRID_CONFIG.rowHeight}px`,
          gap: `${GRID_CONFIG.gap}px`,
          padding: GRID_CONFIG.padding,
        }}
      >
        {/* Grid lines overlay (debug mode) */}
        {showGridLines && (
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
              gridAutoRows: `${GRID_CONFIG.rowHeight}px`,
              gap: `${GRID_CONFIG.gap}px`,
              padding: GRID_CONFIG.padding,
            }}
          >
            {Array.from({ length: gridColumns * maxRow }).map((_, i) => (
              <div
                key={i}
                className="border border-dashed border-white/5 rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Render modules */}
        <AnimatePresence mode="popLayout">
          {modules.map((module) => (
            <ModuleWrapper key={module.id} module={module}>
              <ModuleRenderer module={module} />
            </ModuleWrapper>
          ))}
        </AnimatePresence>
      </div>

      {/* Drag overlay for smooth dragging */}
      <DragOverlay dropAnimation={null}>
        {activeDragModule && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.03, opacity: 0.9 }}
            className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/20 shadow-2xl"
            style={{
              width: `calc(${activeDragModule.position.w} * ((100vw - ${(gridColumns - 1) * GRID_CONFIG.gap}px - ${GRID_CONFIG.padding * 2}px) / ${gridColumns}) + ${(activeDragModule.position.w - 1) * GRID_CONFIG.gap}px)`,
              height: `calc(${activeDragModule.position.h} * ${GRID_CONFIG.rowHeight}px + ${(activeDragModule.position.h - 1) * GRID_CONFIG.gap}px)`,
            }}
          >
            <ModuleRenderer module={activeDragModule} />
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
