'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Module, ModuleSize, ModuleType, SIZE_PRESETS, GRID_CONFIG, ModuleContent } from './grid-types';

interface GridStore {
  modules: Module[];
  selectedModuleId: string | null;
  isDragging: boolean;
  isResizing: boolean;
  gridColumns: number;

  // Module CRUD operations
  addModule: (type: ModuleType, position?: { x: number; y: number }, size?: ModuleSize, content?: ModuleContent) => string;
  removeModule: (id: string) => void;
  updateModule: (id: string, updates: Partial<Module>) => void;

  // Position and sizing
  moveModule: (id: string, x: number, y: number) => void;
  resizeModule: (id: string, w: number, h: number) => void;
  setModuleSize: (id: string, size: ModuleSize) => void;

  // State management
  setSelectedModule: (id: string | null) => void;
  setDragging: (isDragging: boolean) => void;
  setResizing: (isResizing: boolean) => void;
  setGridColumns: (columns: number) => void;

  // Z-index management
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;

  // Sticky toggle
  toggleSticky: (id: string) => void;

  // Bulk operations
  clearModules: () => void;
  loadModules: (modules: Module[]) => void;

  // Helpers
  getMaxZIndex: () => number;
  findAvailablePosition: (w: number, h: number) => { x: number; y: number };
}

// Helper to generate unique IDs
const generateId = () => `module-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Find the next available position on the grid
const findNextPosition = (modules: Module[], w: number, h: number, columns: number): { x: number; y: number } => {
  if (modules.length === 0) return { x: 1, y: 1 };

  // Create a grid occupancy map
  const maxRow = Math.max(...modules.map(m => m.position.y + m.position.h), 1);
  const occupied: boolean[][] = Array.from({ length: maxRow + h + 1 }, () =>
    Array(columns + 1).fill(false)
  );

  // Mark occupied cells
  modules.forEach(m => {
    for (let row = m.position.y; row < m.position.y + m.position.h; row++) {
      for (let col = m.position.x; col < m.position.x + m.position.w; col++) {
        if (occupied[row]) occupied[row][col] = true;
      }
    }
  });

  // Find first available position
  for (let y = 1; y <= maxRow + 1; y++) {
    for (let x = 1; x <= columns - w + 1; x++) {
      let fits = true;
      for (let dy = 0; dy < h && fits; dy++) {
        for (let dx = 0; dx < w && fits; dx++) {
          if (occupied[y + dy]?.[x + dx]) fits = false;
        }
      }
      if (fits) return { x, y };
    }
  }

  // Default: place below existing content
  return { x: 1, y: maxRow + 1 };
};

export const useGridStore = create<GridStore>()(
  persist(
    (set, get) => ({
      modules: [],
      selectedModuleId: null,
      isDragging: false,
      isResizing: false,
      gridColumns: GRID_CONFIG.columns,

      addModule: (type, position, size = 'medium', content = {}) => {
        const id = generateId();
        const sizePreset = SIZE_PRESETS[size];
        const pos = position || get().findAvailablePosition(sizePreset.w, sizePreset.h);

        const newModule: Module = {
          id,
          type,
          position: { x: pos.x, y: pos.y, w: sizePreset.w, h: sizePreset.h },
          content,
          isSticky: false,
          zIndex: get().getMaxZIndex() + 1,
          locked: false,
        };

        set(state => ({ modules: [...state.modules, newModule] }));
        return id;
      },

      removeModule: (id) => {
        set(state => ({
          modules: state.modules.filter(m => m.id !== id),
          selectedModuleId: state.selectedModuleId === id ? null : state.selectedModuleId,
        }));
      },

      updateModule: (id, updates) => {
        set(state => ({
          modules: state.modules.map(m =>
            m.id === id ? { ...m, ...updates } : m
          ),
        }));
      },

      moveModule: (id, x, y) => {
        const { gridColumns } = get();
        const module = get().modules.find(m => m.id === id);
        if (!module) return;

        // Clamp position to grid bounds
        const clampedX = Math.max(1, Math.min(x, gridColumns - module.position.w + 1));
        const clampedY = Math.max(1, y);

        set(state => ({
          modules: state.modules.map(m =>
            m.id === id
              ? { ...m, position: { ...m.position, x: clampedX, y: clampedY } }
              : m
          ),
        }));
      },

      resizeModule: (id, w, h) => {
        const { gridColumns } = get();
        const module = get().modules.find(m => m.id === id);
        if (!module) return;

        // Clamp size
        const clampedW = Math.max(1, Math.min(w, gridColumns - module.position.x + 1));
        const clampedH = Math.max(1, h);

        set(state => ({
          modules: state.modules.map(m =>
            m.id === id
              ? { ...m, position: { ...m.position, w: clampedW, h: clampedH } }
              : m
          ),
        }));
      },

      setModuleSize: (id, size) => {
        const preset = SIZE_PRESETS[size];
        get().resizeModule(id, preset.w, preset.h);
      },

      setSelectedModule: (id) => {
        set({ selectedModuleId: id });
      },

      setDragging: (isDragging) => set({ isDragging }),
      setResizing: (isResizing) => set({ isResizing }),
      setGridColumns: (columns) => set({ gridColumns: columns }),

      bringToFront: (id) => {
        const maxZ = get().getMaxZIndex();
        set(state => ({
          modules: state.modules.map(m =>
            m.id === id ? { ...m, zIndex: maxZ + 1 } : m
          ),
        }));
      },

      sendToBack: (id) => {
        set(state => ({
          modules: state.modules.map(m =>
            m.id === id ? { ...m, zIndex: 0 } : { ...m, zIndex: m.zIndex + 1 }
          ),
        }));
      },

      toggleSticky: (id) => {
        set(state => ({
          modules: state.modules.map(m =>
            m.id === id ? { ...m, isSticky: !m.isSticky } : m
          ),
        }));
      },

      clearModules: () => set({ modules: [], selectedModuleId: null }),

      loadModules: (modules) => set({ modules }),

      getMaxZIndex: () => {
        const { modules } = get();
        return modules.length > 0 ? Math.max(...modules.map(m => m.zIndex)) : 0;
      },

      findAvailablePosition: (w, h) => {
        return findNextPosition(get().modules, w, h, get().gridColumns);
      },
    }),
    {
      name: 'bento-grid-storage',
      partialize: (state) => ({ modules: state.modules }),
    }
  )
);
