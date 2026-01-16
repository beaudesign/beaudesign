// Mock data generator for neural network activations
import type { ActivationNode, ActivationEdge, ActivationGraph, SearchQuery } from './interpretability-types'

// Simulate t-SNE/UMAP dimensionality reduction with clustering
function generateClusteredPosition(cluster: number, variance: number = 1): [number, number, number] {
  const clusterCenters = [
    [5, 5, 5],
    [-5, 5, -5],
    [5, -5, -5],
    [-5, -5, 5],
    [0, 8, 0],
    [8, 0, 0],
  ]

  const center = clusterCenters[cluster % clusterCenters.length]
  return [
    center[0] + (Math.random() - 0.5) * variance * 4,
    center[1] + (Math.random() - 0.5) * variance * 4,
    center[2] + (Math.random() - 0.5) * variance * 4,
  ]
}

// Generate semantic labels based on common interpretable features
const featureLabels = [
  // Linguistic features
  'Subject-Verb Agreement', 'Past Tense', 'Plural Marker', 'Article Detection',
  'Negation', 'Question Formation', 'Preposition Use', 'Modal Verbs',

  // Semantic features
  'Sentiment (Positive)', 'Sentiment (Negative)', 'Emotion: Joy', 'Emotion: Anger',
  'Named Entity: Person', 'Named Entity: Location', 'Named Entity: Organization',

  // Syntactic features
  'Noun Phrase', 'Verb Phrase', 'Relative Clause', 'Subordinate Clause',
  'Dependency: Subject', 'Dependency: Object', 'Coordination',

  // Abstract features
  'Topic: Technology', 'Topic: Science', 'Topic: Politics', 'Topic: Sports',
  'Formality Level', 'Certainty', 'Temporal Reference',

  // Low-level features
  'Token Position Early', 'Token Position Late', 'Rare Token',
  'Punctuation', 'Capitalization', 'Word Length'
]

export function generateMockActivations(
  inputText: string,
  layers: number = 6,
  nodesPerLayer: number = 8
): ActivationGraph {
  const nodes: ActivationNode[] = []
  const edges: ActivationEdge[] = []

  // Generate nodes for each layer
  for (let layer = 0; layer < layers; layer++) {
    const cluster = layer % 6

    for (let neuronIndex = 0; neuronIndex < nodesPerLayer; neuronIndex++) {
      const id = `L${layer}-N${neuronIndex}`
      const labelIndex = (layer * nodesPerLayer + neuronIndex) % featureLabels.length

      nodes.push({
        id,
        label: featureLabels[labelIndex],
        position: generateClusteredPosition(cluster, 1 + layer * 0.2),
        activation: Math.random() * 0.7 + 0.3, // Higher activations for visibility
        layer,
        neuronIndex,
      })
    }
  }

  // Generate edges between adjacent layers (feed-forward connections)
  for (let layer = 0; layer < layers - 1; layer++) {
    for (let sourceIdx = 0; sourceIdx < nodesPerLayer; sourceIdx++) {
      // Connect to 2-4 nodes in the next layer
      const numConnections = Math.floor(Math.random() * 3) + 2

      for (let i = 0; i < numConnections; i++) {
        const targetIdx = Math.floor(Math.random() * nodesPerLayer)
        const source = `L${layer}-N${sourceIdx}`
        const target = `L${layer + 1}-N${targetIdx}`

        edges.push({
          source,
          target,
          weight: Math.random() * 0.6 + 0.2,
          type: Math.random() > 0.15 ? 'excitatory' : 'inhibitory',
        })
      }
    }
  }

  // Add some skip connections (between non-adjacent layers)
  for (let i = 0; i < layers * 2; i++) {
    const sourceLayer = Math.floor(Math.random() * (layers - 2))
    const targetLayer = sourceLayer + 2 + Math.floor(Math.random() * (layers - sourceLayer - 2))
    const sourceIdx = Math.floor(Math.random() * nodesPerLayer)
    const targetIdx = Math.floor(Math.random() * nodesPerLayer)

    edges.push({
      source: `L${sourceLayer}-N${sourceIdx}`,
      target: `L${targetLayer}-N${targetIdx}`,
      weight: Math.random() * 0.4 + 0.1,
      type: 'excitatory',
    })
  }

  return {
    nodes,
    edges,
    metadata: {
      model: 'Gemma-2-9B',
      inputText,
      layers,
      timestamp: new Date(),
    },
  }
}

// Simulate searching for activations related to input text
export function searchActivations(
  graph: ActivationGraph,
  query: SearchQuery
): ActivationGraph {
  // Simple mock: highlight random nodes with similarity scores
  const queryTerms = query.text.toLowerCase().split(' ')

  const filteredNodes = graph.nodes.map(node => {
    // Simulate semantic similarity by checking label overlap
    const labelWords = node.label.toLowerCase().split(' ')
    const hasMatch = queryTerms.some(term =>
      labelWords.some(word => word.includes(term) || term.includes(word))
    )

    // Apply layer filter if specified
    const layerMatch = query.layer === undefined || node.layer === query.layer

    if (!layerMatch) {
      return { ...node, activation: node.activation * 0.2, similarityScore: 0 }
    }

    if (hasMatch) {
      return {
        ...node,
        activation: Math.min(1, node.activation * 1.5),
        similarityScore: 0.7 + Math.random() * 0.3
      }
    }

    // Add random noise for realism
    const randomSimilarity = Math.random()
    return {
      ...node,
      activation: randomSimilarity > 0.7 ? node.activation * 1.2 : node.activation * 0.5,
      similarityScore: randomSimilarity > 0.7 ? randomSimilarity : randomSimilarity * 0.3,
    }
  })

  // Filter by threshold if specified
  const thresholdFiltered = query.threshold
    ? filteredNodes.filter(node => (node.similarityScore || 0) >= query.threshold!)
    : filteredNodes

  // Only include edges where both nodes are still present
  const nodeIds = new Set(thresholdFiltered.map(n => n.id))
  const filteredEdges = graph.edges.filter(edge =>
    nodeIds.has(edge.source) && nodeIds.has(edge.target)
  )

  return {
    nodes: thresholdFiltered,
    edges: filteredEdges,
    metadata: graph.metadata,
  }
}
