'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { InterpretabilitySearchPanel } from '@/components/interpretability-search-panel'
import { ActivationVisualization3D } from '@/components/activation-visualization-3d'
import { generateMockActivations, searchActivations } from '@/lib/mock-activations'
import type { ActivationGraph, SearchQuery, ActivationNode } from '@/lib/interpretability-types'

export default function InterpretabilityPage() {
  const [activationGraph, setActivationGraph] = useState<ActivationGraph | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>('')

  // Initialize with default visualization
  useEffect(() => {
    const initialGraph = generateMockActivations('Initial neural network state', 6, 8)
    setActivationGraph(initialGraph)
  }, [])

  const handleSearch = async (query: SearchQuery) => {
    if (!activationGraph) return

    setIsLoading(true)
    setCurrentQuery(query.text)

    // Simulate async processing (would be API call in production)
    await new Promise(resolve => setTimeout(resolve, 500))

    // Generate new activations based on search query
    const baseGraph = generateMockActivations(query.text, 6, 8)
    const searchResults = searchActivations(baseGraph, query)

    setActivationGraph(searchResults)
    setIsLoading(false)
  }

  const handleNodeClick = (node: ActivationNode) => {
    console.log('Node clicked:', node)
    // Future: Could trigger additional analysis or detail view
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-ui-01">
      {/* Back Navigation */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <button className="flex items-center gap-2 px-3 py-2 bg-ui-01 border border-border-subtle rounded-lg hover:bg-ui-02 text-text-01 text-sm shadow-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>

      {/* Left Panel - Search & Controls */}
      <div className="w-80 flex-shrink-0">
        <InterpretabilitySearchPanel onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Right Panel - 3D Visualization */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-ui-01 bg-opacity-80 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-interactive mb-spacing-04"></div>
              <p className="text-text-01 font-medium">Analyzing activations...</p>
              <p className="text-text-02 text-sm mt-spacing-02">
                Computing {currentQuery} embeddings
              </p>
            </div>
          </div>
        )}

        {activationGraph ? (
          <ActivationVisualization3D graph={activationGraph} onNodeClick={handleNodeClick} />
        ) : (
          <div className="h-full flex items-center justify-center text-text-02">
            <p>Loading visualization...</p>
          </div>
        )}
      </div>
    </div>
  )
}
