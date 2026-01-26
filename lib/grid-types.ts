// Grid Module Types for Bento Dashboard

export type ModuleSize = 'small' | 'medium' | 'large' | 'wide' | 'custom';

export type ModuleType =
  | 'hero'
  | 'nav'
  | 'text'
  | 'image'
  | 'stats'
  | 'chart'
  | 'embed'
  | 'clock'
  | 'weather'
  | 'social'
  | 'custom';

export interface ModulePosition {
  x: number; // Grid column start (1-12)
  y: number; // Grid row start
  w: number; // Grid columns span
  h: number; // Grid rows span
}

export interface Module {
  id: string;
  type: ModuleType;
  position: ModulePosition;
  content: ModuleContent;
  isSticky?: boolean;
  zIndex: number;
  locked?: boolean;
}

export interface ModuleContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  link?: string;
  icon?: string;
  stats?: { label: string; value: string | number }[];
  customData?: Record<string, unknown>;
}

// Size presets matching the grid specifications
export const SIZE_PRESETS: Record<ModuleSize, { w: number; h: number }> = {
  small: { w: 2, h: 2 },    // 240 × 240px approx
  medium: { w: 4, h: 3 },   // 480 × 360px approx
  large: { w: 8, h: 4 },    // 960 × 480px approx
  wide: { w: 12, h: 2 },    // full width
  custom: { w: 4, h: 4 },   // customizable
};

// Grid configuration
export const GRID_CONFIG = {
  columns: 12,
  rowHeight: 120, // px
  gap: 24, // px
  padding: 24, // px
  breakpoints: {
    desktop: 1440,
    tablet: 1024,
    mobile: 768,
  },
};

export interface GridState {
  modules: Module[];
  selectedModuleId: string | null;
  isDragging: boolean;
  isResizing: boolean;
  gridColumns: number;
}
