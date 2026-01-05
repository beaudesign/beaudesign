"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUp, User, Sparkles, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (replace with actual AI SDK integration)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a placeholder response. Integrate with AI SDK for actual responses.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-ui-02">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-60 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-text-01">Relay Assistant</h2>
            <p className="text-xs text-text-03">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-blue-60" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-text-01">
                Start a conversation
              </h3>
              <p className="text-sm text-text-03 max-w-md">
                Ask me anything, and I'll do my best to help you with research,
                analysis, or any other task.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-4",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-blue-60 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={cn(
                    "flex flex-col gap-2 max-w-[80%]",
                    message.role === "user" && "items-end"
                  )}
                >
                  <Card
                    className={cn(
                      "px-4 py-3",
                      message.role === "user"
                        ? "bg-blue-60 text-white border-blue-60"
                        : "bg-ui-02 text-text-01"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </Card>

                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 px-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-text-03 hover:text-text-01"
                        onClick={() => handleCopy(message.content)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-text-03 hover:text-text-01"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-text-03 hover:text-text-01"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-ui-03 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-text-02" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-60 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <Card className="px-4 py-3 bg-ui-02">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-text-03 animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-text-03 animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-text-03 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="px-6 py-4 border-t border-border-subtle bg-ui-01">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full h-12 bg-background border-border-subtle resize-none"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 rounded-full bg-interactive hover:bg-blue-70 text-white flex-shrink-0"
            disabled={!input.trim() || isLoading}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </form>
        <p className="text-xs text-text-03 mt-2 text-center">
          Relay can make mistakes. Check important info.
        </p>
      </div>
    </div>
  )
}
