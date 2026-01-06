"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ModularHomepage } from "@/components/modular-homepage"
import { ChatWindow } from "@/components/chat-window"
import { Skills } from "@/components/skills"

export function RelayLayout() {
  const [currentView, setCurrentView] = useState<"home" | "chat" | "skills">("home")

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <ModularHomepage />
      case "chat":
        return <ChatWindow />
      case "skills":
        return <Skills />
      default:
        return <ModularHomepage />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
    </div>
  )
}
