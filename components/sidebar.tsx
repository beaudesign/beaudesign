"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Home,
  MessageSquare,
  Settings,
  Plus,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
}

interface SidebarProps {
  currentView: "home" | "chat"
  onViewChange: (view: "home" | "chat") => void
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [recentChats, setRecentChats] = useState<string[]>([
    "Research on AI trends",
    "Analysis of market data",
    "Build a dashboard",
  ])

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      onClick: () => onViewChange("home"),
    },
    {
      id: "chat",
      label: "New Chat",
      icon: <MessageSquare className="w-5 h-5" />,
      onClick: () => onViewChange("chat"),
    },
  ]

  return (
    <aside
      className={cn(
        "h-screen bg-ui-01 border-r border-border-subtle transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border-subtle flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-60 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="font-semibold text-text-01">Relay</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-text-02 hover:text-text-01"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="p-3 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3",
              isCollapsed && "justify-center px-0"
            )}
            onClick={item.onClick}
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </div>

      {/* Recent Chats */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2 py-1">
              <h2 className="text-xs font-medium text-text-03 uppercase tracking-wide">
                Recent
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-text-03 hover:text-text-01"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {recentChats.map((chat, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-ui-02"
                onClick={() => onViewChange("chat")}
              >
                <div className="flex items-start gap-2 w-full">
                  <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-text-03" />
                  <span className="text-sm text-text-02 truncate flex-1">
                    {chat}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-border-subtle space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3",
            isCollapsed && "justify-center px-0"
          )}
        >
          <Clock className="w-5 h-5" />
          {!isCollapsed && <span>History</span>}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3",
            isCollapsed && "justify-center px-0"
          )}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </Button>
      </div>
    </aside>
  )
}
