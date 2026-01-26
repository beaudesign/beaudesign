'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import {
  Maximize2,
  Minimize2,
  Square,
  Pin,
  PinOff,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit3,
  Copy,
  Lock,
  Unlock,
} from 'lucide-react';
import { useGridStore } from '@/lib/grid-store';
import { ModuleSize } from '@/lib/grid-types';
import { cn } from '@/lib/utils';

interface ModuleContextMenuProps {
  children: React.ReactNode;
  moduleId: string;
  isSticky?: boolean;
  isLocked?: boolean;
  onEdit?: () => void;
}

const menuItemClasses =
  'flex items-center gap-3 px-3 py-2 text-sm text-neutral-200 cursor-pointer outline-none rounded-lg transition-colors hover:bg-white/10 focus:bg-white/10 data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed';

const separatorClasses = 'h-px bg-white/10 my-1';

export function ModuleContextMenu({
  children,
  moduleId,
  isSticky = false,
  isLocked = false,
  onEdit,
}: ModuleContextMenuProps) {
  const { setModuleSize, toggleSticky, bringToFront, sendToBack, removeModule, updateModule } =
    useGridStore();

  const handleResize = (size: ModuleSize) => {
    setModuleSize(moduleId, size);
  };

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger asChild>{children}</ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content className="z-[100] min-w-[200px] rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl shadow-black/40 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <div>
              {/* Resize submenu */}
              <ContextMenuPrimitive.Sub>
                <ContextMenuPrimitive.SubTrigger
                  className={cn(menuItemClasses, 'data-[state=open]:bg-white/10')}
                  disabled={isLocked}
                >
                  <Maximize2 className="w-4 h-4 text-neutral-400" />
                  <span>Resize</span>
                  <span className="ml-auto text-neutral-500">▸</span>
                </ContextMenuPrimitive.SubTrigger>
                <ContextMenuPrimitive.Portal>
                  <ContextMenuPrimitive.SubContent className="z-[101] min-w-[160px] rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl shadow-black/40 animate-in fade-in-0 zoom-in-95">
                    <div>
                      <ContextMenuPrimitive.Item
                        className={menuItemClasses}
                        onSelect={() => handleResize('small')}
                      >
                        <Minimize2 className="w-4 h-4 text-neutral-400" />
                        <span>Small</span>
                        <span className="ml-auto text-xs text-neutral-500">2×2</span>
                      </ContextMenuPrimitive.Item>
                      <ContextMenuPrimitive.Item
                        className={menuItemClasses}
                        onSelect={() => handleResize('medium')}
                      >
                        <Square className="w-4 h-4 text-neutral-400" />
                        <span>Medium</span>
                        <span className="ml-auto text-xs text-neutral-500">4×3</span>
                      </ContextMenuPrimitive.Item>
                      <ContextMenuPrimitive.Item
                        className={menuItemClasses}
                        onSelect={() => handleResize('large')}
                      >
                        <Maximize2 className="w-4 h-4 text-neutral-400" />
                        <span>Large</span>
                        <span className="ml-auto text-xs text-neutral-500">8×4</span>
                      </ContextMenuPrimitive.Item>
                      <ContextMenuPrimitive.Item
                        className={menuItemClasses}
                        onSelect={() => handleResize('wide')}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-4 h-1.5 rounded bg-neutral-400" />
                        </div>
                        <span>Wide</span>
                        <span className="ml-auto text-xs text-neutral-500">12×2</span>
                      </ContextMenuPrimitive.Item>
                    </div>
                  </ContextMenuPrimitive.SubContent>
                </ContextMenuPrimitive.Portal>
              </ContextMenuPrimitive.Sub>

              <ContextMenuPrimitive.Separator className={separatorClasses} />

              {/* Sticky toggle */}
              <ContextMenuPrimitive.Item
                className={menuItemClasses}
                onSelect={() => toggleSticky(moduleId)}
                disabled={isLocked}
              >
                {isSticky ? (
                  <>
                    <PinOff className="w-4 h-4 text-neutral-400" />
                    <span>Unpin</span>
                  </>
                ) : (
                  <>
                    <Pin className="w-4 h-4 text-neutral-400" />
                    <span>Pin to top</span>
                  </>
                )}
              </ContextMenuPrimitive.Item>

              {/* Lock toggle */}
              <ContextMenuPrimitive.Item
                className={menuItemClasses}
                onSelect={() => updateModule(moduleId, { locked: !isLocked })}
              >
                {isLocked ? (
                  <>
                    <Unlock className="w-4 h-4 text-neutral-400" />
                    <span>Unlock</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-neutral-400" />
                    <span>Lock position</span>
                  </>
                )}
              </ContextMenuPrimitive.Item>

              <ContextMenuPrimitive.Separator className={separatorClasses} />

              {/* Z-index controls */}
              <ContextMenuPrimitive.Item
                className={menuItemClasses}
                onSelect={() => bringToFront(moduleId)}
              >
                <ArrowUp className="w-4 h-4 text-neutral-400" />
                <span>Bring to front</span>
              </ContextMenuPrimitive.Item>
              <ContextMenuPrimitive.Item
                className={menuItemClasses}
                onSelect={() => sendToBack(moduleId)}
              >
                <ArrowDown className="w-4 h-4 text-neutral-400" />
                <span>Send to back</span>
              </ContextMenuPrimitive.Item>

              <ContextMenuPrimitive.Separator className={separatorClasses} />

              {/* Edit and duplicate */}
              {onEdit && (
                <ContextMenuPrimitive.Item
                  className={menuItemClasses}
                  onSelect={onEdit}
                >
                  <Edit3 className="w-4 h-4 text-neutral-400" />
                  <span>Edit content</span>
                </ContextMenuPrimitive.Item>
              )}
              <ContextMenuPrimitive.Item className={menuItemClasses} disabled>
                <Copy className="w-4 h-4 text-neutral-400" />
                <span>Duplicate</span>
              </ContextMenuPrimitive.Item>

              <ContextMenuPrimitive.Separator className={separatorClasses} />

              {/* Delete */}
              <ContextMenuPrimitive.Item
                className={cn(menuItemClasses, 'text-red-400 hover:bg-red-500/20 focus:bg-red-500/20')}
                onSelect={() => removeModule(moduleId)}
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </ContextMenuPrimitive.Item>
            </div>
          </ContextMenuPrimitive.Content>
        </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
