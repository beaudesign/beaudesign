// Type definitions for interpretability visualization

export interface ActivationNode {
  id: string
  label: string
  position: [number, number, number] // 3D coordinates
  activation: number // Activation strength (0-1)
  layer: number
  neuronIndex: number
  tokenIndex?: number
  similarityScore?: number // For search results
}

export interface ActivationEdge {
  source: string
  target: string
  weight: number // Connection strength (0-1)
  type: 'excitatory' | 'inhibitory'
}

export interface ActivationGraph {
  nodes: ActivationNode[]
  edges: ActivationEdge[]
  metadata: {
    model: string
    inputText: string
    layers: number
    timestamp: Date
  }
}

export interface SearchQuery {
  text: string
  layer?: number
  threshold?: number
}
