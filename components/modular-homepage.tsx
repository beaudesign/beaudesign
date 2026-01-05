"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Globe, ArrowUp, Search as SearchIcon, FileText, BarChart3, Hammer } from "lucide-react"

interface ActionCard {
  id: string
  title: string
  icon: React.ReactNode
}

const actionCards: ActionCard[] = [
  {
    id: "research",
    title: "Research",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "analyse",
    title: "Analyse",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: "search",
    title: "Search",
    icon: <SearchIcon className="w-6 h-6" />,
  },
  {
    id: "build",
    title: "Build",
    icon: <Hammer className="w-6 h-6" />,
  },
]

export function ModularHomepage() {
  const [query, setQuery] = useState("")
  const [showAllSources, setShowAllSources] = useState(false)

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  const handleActionCard = (actionId: string) => {
    console.log("Action selected:", actionId)
    // Handle action card click
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      console.log("Submitted query:", query)
      // Handle query submission
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-b from-blue-10 to-background">
      <div className="w-full max-w-4xl space-y-8">
        {/* Greeting Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-normal text-text-01">
            {getGreeting()}, <span className="font-medium">Benjamin</span>
          </h1>
          <p className="text-xl text-text-03">
            What do you want to work on today?
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actionCards.map((card) => (
            <Card
              key={card.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:border-interactive p-6 flex flex-col items-center justify-center space-y-3 h-32 bg-ui-02"
              onClick={() => handleActionCard(card.id)}
            >
              <div className="text-text-02">{card.icon}</div>
              <h3 className="text-sm font-medium text-text-01">{card.title}</h3>
            </Card>
          ))}
        </div>

        {/* Search Input Section */}
        <Card className="p-6 shadow-lg bg-ui-02">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="What would you like to know?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-base h-12 bg-background border-border-subtle focus:border-interactive"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-text-02 hover:text-text-01"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
                <Button
                  type="button"
                  variant={showAllSources ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setShowAllSources(!showAllSources)}
                  className="text-text-02 hover:text-text-01"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  All Sources
                </Button>
              </div>

              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-interactive hover:bg-blue-70 text-white"
                disabled={!query.trim()}
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Recent Chats/Widgets could go here */}
        <div className="text-center text-sm text-text-03">
          <p>Your chats and widgets will appear here</p>
        </div>
      </div>
    </div>
  )
}
