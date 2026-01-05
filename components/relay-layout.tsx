"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ModularHomepage } from "@/components/modular-homepage"
import { ChatWindow } from "@/components/chat-window"

export function RelayLayout() {
  const [currentView, setCurrentView] = useState<"home" | "chat">("home")

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {currentView === "home" ? <ModularHomepage /> : <ChatWindow />}
      </main>
    </div>
  )
}
