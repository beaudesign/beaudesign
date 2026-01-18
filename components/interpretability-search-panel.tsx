'use client'

import { useState } from 'react'
import { Search, Layers, Settings, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import type { SearchQuery } from '@/lib/interpretability-types'

interface SearchPanelProps {
  onSearch: (query: SearchQuery) => void
  isLoading?: boolean
}

export function InterpretabilitySearchPanel({ onSearch, isLoading = false }: SearchPanelProps) {
  const [searchText, setSearchText] = useState('')
  const [selectedLayer, setSelectedLayer] = useState<number | undefined>(undefined)
  const [threshold, setThreshold] = useState(0.5)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = () => {
    if (!searchText.trim()) return

    onSearch({
      text: searchText,
      layer: selectedLayer,
      threshold,
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col h-full bg-ui-01 border-r border-border-subtle">
      {/* Header */}
      <div className="p-spacing-05 border-b border-border-subtle">
        <h2 className="text-lg font-semibold text-text-01 mb-spacing-02">
          Activation Explorer
        </h2>
        <p className="text-sm text-text-02">
          Search for neural activations and explore vector space
        </p>
      </div>

      {/* Search Input */}
      <div className="p-spacing-05 border-b border-border-subtle">
        <div className="space-y-spacing-04">
          <div>
            <label className="text-sm font-medium text-text-01 mb-spacing-02 block">
              Input Text or Phrase
            </label>
            <div className="flex gap-spacing-03">
              <Input
                type="text"
                placeholder="e.g., sentiment, negation, subject..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchText.trim()}
                className="shrink-0"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap gap-spacing-02">
            <span className="text-xs text-text-03">Quick examples:</span>
            {['sentiment', 'negation', 'emotion', 'syntax'].map((example) => (
              <button
                key={example}
                onClick={() => {
                  setSearchText(example)
                  onSearch({ text: example, layer: selectedLayer, threshold })
                }}
                disabled={isLoading}
                className="text-xs px-spacing-03 py-spacing-02 bg-blue-10 text-blue-60 rounded hover:bg-blue-20 disabled:opacity-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="p-spacing-05 border-b border-border-subtle">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-spacing-02 text-sm font-medium text-text-01 hover:text-interactive w-full"
        >
          <Settings className="w-4 h-4" />
          Advanced Filters
          <span className="ml-auto text-text-03">{showAdvanced ? '−' : '+'}</span>
        </button>

        {showAdvanced && (
          <div className="mt-spacing-04 space-y-spacing-04">
            {/* Layer Filter */}
            <div>
              <label className="text-xs font-medium text-text-02 mb-spacing-02 flex items-center gap-spacing-02">
                <Layers className="w-3 h-3" />
                Filter by Layer
              </label>
              <div className="flex items-center gap-spacing-02">
                <select
                  value={selectedLayer ?? 'all'}
                  onChange={(e) =>
                    setSelectedLayer(e.target.value === 'all' ? undefined : parseInt(e.target.value))
                  }
                  disabled={isLoading}
                  className="w-full px-spacing-03 py-spacing-02 bg-ui-02 border border-border-subtle rounded text-sm text-text-01 focus:outline-none focus:ring-2 focus:ring-interactive"
                >
                  <option value="all">All Layers</option>
                  {[0, 1, 2, 3, 4, 5].map((layer) => (
                    <option key={layer} value={layer}>
                      Layer {layer}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Similarity Threshold */}
            <div>
              <label className="text-xs font-medium text-text-02 mb-spacing-02 block">
                Similarity Threshold: {threshold.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                disabled={isLoading}
                className="w-full accent-interactive"
              />
              <div className="flex justify-between text-xs text-text-03 mt-spacing-01">
                <span>Less strict</span>
                <span>More strict</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1 overflow-y-auto p-spacing-05">
        <Card className="p-spacing-04 bg-blue-10 border-blue-30">
          <div className="flex gap-spacing-03">
            <Info className="w-5 h-5 text-blue-60 shrink-0 mt-spacing-01" />
            <div className="space-y-spacing-03">
              <h3 className="text-sm font-semibold text-blue-70">
                About This Tool
              </h3>
              <p className="text-xs text-blue-70 leading-relaxed">
                This interpretability tool visualizes neural network activations in 3D space,
                inspired by Gemma Scope and Mishax. Each node represents a neuron activation,
                and connections show how information flows through the network.
              </p>
              <div className="space-y-spacing-02 text-xs text-blue-70">
                <p><strong>Nodes:</strong> Individual neuron activations</p>
                <p><strong>Lines:</strong> Connection weights between neurons</p>
                <p><strong>Colors:</strong> Activation strength (bright = high)</p>
                <p><strong>Clusters:</strong> Similar feature representations</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Model Info */}
        <div className="mt-spacing-05 p-spacing-04 bg-ui-02 rounded border border-border-subtle">
          <h4 className="text-xs font-semibold text-text-01 mb-spacing-03">Model Info</h4>
          <dl className="space-y-spacing-02 text-xs">
            <div className="flex justify-between">
              <dt className="text-text-02">Model:</dt>
              <dd className="text-text-01 font-mono">Gemma-2-9B</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-02">Layers:</dt>
              <dd className="text-text-01">6</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-02">Dimensions:</dt>
              <dd className="text-text-01">3D (t-SNE)</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-spacing-05 border-t border-border-subtle bg-ui-02">
        <div className="flex items-center justify-between text-xs text-text-02">
          <span>Interactive 3D Visualization</span>
          <span className="text-text-03">Scroll to zoom</span>
        </div>
      </div>
    </div>
  )
}
