"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Skill {
  id: string
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  category?: string
}

const skillLevels = [
  { value: "beginner", label: "Beginner", color: "bg-blue-20 text-blue-80" },
  { value: "intermediate", label: "Intermediate", color: "bg-blue-40 text-white" },
  { value: "advanced", label: "Advanced", color: "bg-blue-60 text-white" },
  { value: "expert", label: "Expert", color: "bg-blue-80 text-white" },
] as const

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "TypeScript", level: "advanced", category: "Programming" },
    { id: "2", name: "React", level: "expert", category: "Frontend" },
    { id: "3", name: "Design Systems", level: "intermediate", category: "Design" },
  ])
  const [newSkill, setNewSkill] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<Skill["level"]>("intermediate")
  const [category, setCategory] = useState("")

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim()) return

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: selectedLevel,
      category: category.trim() || undefined,
    }

    setSkills([...skills, skill])
    setNewSkill("")
    setCategory("")
  }

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const getLevelColor = (level: Skill["level"]) => {
    return skillLevels.find((l) => l.value === level)?.color || "bg-gray-30"
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border-subtle bg-ui-02">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-60 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-text-01">Skills Profile</h1>
          </div>
          <p className="text-text-02">
            Manage your skills and expertise levels to help Relay provide better assistance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Add New Skill Card */}
          <Card className="bg-ui-02">
            <CardHeader>
              <CardTitle className="text-lg">Add New Skill</CardTitle>
              <CardDescription>
                Add skills to your profile and indicate your proficiency level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-01">
                      Skill Name
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Python, Design Thinking..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-01">
                      Category (Optional)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Programming, Design..."
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-01">
                      Proficiency Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value as Skill["level"])}
                      className="flex h-9 w-full rounded-md border border-border-subtle bg-background px-3 py-1 text-sm text-text-01 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                    >
                      {skillLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={!newSkill.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Skills List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-01">Your Skills</h2>

            {Object.keys(groupedSkills).length === 0 ? (
              <Card className="bg-ui-02">
                <CardContent className="py-12 text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-text-03" />
                  <h3 className="text-lg font-medium text-text-01 mb-2">
                    No skills added yet
                  </h3>
                  <p className="text-sm text-text-03">
                    Start building your skills profile by adding your first skill above
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedSkills).map(([categoryName, categorySkills]) => (
                  <Card key={categoryName} className="bg-ui-02">
                    <CardHeader>
                      <CardTitle className="text-base">{categoryName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {categorySkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle bg-background hover:border-interactive transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-text-01">
                                {skill.name}
                              </span>
                              <span
                                className={cn(
                                  "text-xs font-medium px-2 py-1 rounded",
                                  getLevelColor(skill.level)
                                )}
                              >
                                {skillLevels.find((l) => l.value === skill.level)?.label}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-text-03 hover:text-text-01"
                              onClick={() => handleRemoveSkill(skill.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Stats Card */}
          {skills.length > 0 && (
            <Card className="bg-gradient-to-br from-blue-10 to-ui-02 border-blue-30">
              <CardContent className="py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-70">{skills.length}</div>
                    <div className="text-sm text-text-02">Total Skills</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-70">
                      {skills.filter((s) => s.level === "expert").length}
                    </div>
                    <div className="text-sm text-text-02">Expert Level</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-70">
                      {Object.keys(groupedSkills).length}
                    </div>
                    <div className="text-sm text-text-02">Categories</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-70">
                      {skills.filter((s) => s.level === "advanced" || s.level === "expert").length}
                    </div>
                    <div className="text-sm text-text-02">Advanced+</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
