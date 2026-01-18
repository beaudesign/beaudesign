'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import type { ActivationGraph, ActivationNode, ActivationEdge } from '@/lib/interpretability-types'

interface ActivationNodeProps {
  node: ActivationNode
  onClick: (node: ActivationNode) => void
  isSelected: boolean
}

function ActivationNodeComponent({ node, onClick, isSelected }: ActivationNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Pulsing animation for high activation
  useFrame((state) => {
    if (meshRef.current && node.activation > 0.7) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      meshRef.current.scale.setScalar(pulse)
    }
  })

  // Color based on activation strength and similarity score
  const color = useMemo(() => {
    if (isSelected) return '#0066ff' // Blue for selected
    if (node.similarityScore !== undefined && node.similarityScore > 0.6) {
      return '#00ff88' // Cyan for high similarity
    }

    // Gradient from dark blue to bright yellow based on activation
    const hue = 240 - node.activation * 180 // 240 (blue) to 60 (yellow)
    const saturation = 70 + node.activation * 30
    const lightness = 30 + node.activation * 50
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }, [node.activation, node.similarityScore, isSelected])

  // Size based on activation and similarity
  const size = useMemo(() => {
    const base = 0.15
    const activationBoost = node.activation * 0.15
    const similarityBoost = (node.similarityScore || 0) * 0.2
    return base + activationBoost + similarityBoost
  }, [node.activation, node.similarityScore])

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick(node)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={node.activation * 0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Glow effect for high activations */}
      {node.activation > 0.6 && (
        <mesh scale={size * 1.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={node.activation * 0.2}
          />
        </mesh>
      )}

      {/* Label on hover */}
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-gray-90 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none shadow-lg border border-gray-70">
            <div className="font-semibold">{node.label}</div>
            <div className="text-gray-30 text-[10px]">
              L{node.layer} · N{node.neuronIndex}
            </div>
            <div className="text-[10px] mt-1">
              Activation: {(node.activation * 100).toFixed(1)}%
              {node.similarityScore !== undefined && (
                <> · Match: {(node.similarityScore * 100).toFixed(1)}%</>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

interface ActivationEdgeProps {
  edge: ActivationEdge
  nodes: Map<string, ActivationNode>
}

function ActivationEdgeComponent({ edge, nodes }: ActivationEdgeProps) {
  const sourceNode = nodes.get(edge.source)
  const targetNode = nodes.get(edge.target)

  if (!sourceNode || !targetNode) return null

  // Color based on edge type
  const color = edge.type === 'excitatory' ? '#4466ff' : '#ff4466'

  // Opacity based on weight
  const opacity = edge.weight * 0.3 + 0.05

  return (
    <Line
      points={[sourceNode.position, targetNode.position]}
      color={color}
      lineWidth={edge.weight * 2}
      transparent
      opacity={opacity}
    />
  )
}

interface ActivationVisualization3DProps {
  graph: ActivationGraph
  onNodeClick?: (node: ActivationNode) => void
}

export function ActivationVisualization3D({ graph, onNodeClick }: ActivationVisualization3DProps) {
  const [selectedNode, setSelectedNode] = useState<ActivationNode | null>(null)

  const nodeMap = useMemo(() => {
    const map = new Map<string, ActivationNode>()
    graph.nodes.forEach((node) => map.set(node.id, node))
    return map
  }, [graph.nodes])

  const handleNodeClick = (node: ActivationNode) => {
    setSelectedNode(node)
    onNodeClick?.(node)
  }

  return (
    <div className="w-full h-full bg-gray-100 relative">
      {/* 3D Canvas */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 25]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />

        {/* Edges (render first, behind nodes) */}
        {graph.edges.map((edge, idx) => (
          <ActivationEdgeComponent key={`edge-${idx}`} edge={edge} nodes={nodeMap} />
        ))}

        {/* Nodes */}
        {graph.nodes.map((node) => (
          <ActivationNodeComponent
            key={node.id}
            node={node}
            onClick={handleNodeClick}
            isSelected={selectedNode?.id === node.id}
          />
        ))}

        {/* Grid Helper */}
        <gridHelper args={[30, 30, '#666666', '#333333']} position={[0, -8, 0]} />

        {/* Orbit Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          zoomSpeed={0.8}
        />
      </Canvas>

      {/* Selection Info Panel */}
      {selectedNode && (
        <div className="absolute top-4 left-4 bg-ui-01 border border-border-subtle rounded-lg shadow-lg p-spacing-04 max-w-xs">
          <div className="flex items-start justify-between mb-spacing-03">
            <h3 className="font-semibold text-text-01 text-sm">{selectedNode.label}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-text-03 hover:text-text-01 ml-spacing-03"
            >
              ✕
            </button>
          </div>

          <dl className="space-y-spacing-02 text-xs">
            <div className="flex justify-between">
              <dt className="text-text-02">Layer:</dt>
              <dd className="text-text-01 font-mono">{selectedNode.layer}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-02">Neuron Index:</dt>
              <dd className="text-text-01 font-mono">{selectedNode.neuronIndex}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-02">Activation:</dt>
              <dd className="text-text-01 font-mono">{(selectedNode.activation * 100).toFixed(1)}%</dd>
            </div>
            {selectedNode.similarityScore !== undefined && (
              <div className="flex justify-between">
                <dt className="text-text-02">Similarity:</dt>
                <dd className="text-text-01 font-mono">{(selectedNode.similarityScore * 100).toFixed(1)}%</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-text-02">Position:</dt>
              <dd className="text-text-01 font-mono text-[10px]">
                [{selectedNode.position.map(v => v.toFixed(1)).join(', ')}]
              </dd>
            </div>
          </dl>

          <div className="mt-spacing-04 pt-spacing-03 border-t border-border-subtle">
            <p className="text-xs text-text-02 leading-relaxed">
              This neuron activates for patterns related to{' '}
              <span className="text-text-01 font-semibold">{selectedNode.label.toLowerCase()}</span>
              {' '}in the input text.
            </p>
          </div>
        </div>
      )}

      {/* Instructions Overlay */}
      <div className="absolute bottom-4 right-4 bg-ui-01 bg-opacity-90 border border-border-subtle rounded px-spacing-04 py-spacing-03">
        <div className="text-xs text-text-02 space-y-spacing-01">
          <p><strong className="text-text-01">Click + Drag:</strong> Rotate view</p>
          <p><strong className="text-text-01">Scroll:</strong> Zoom in/out</p>
          <p><strong className="text-text-01">Click Node:</strong> View details</p>
        </div>
      </div>

      {/* Metadata Display */}
      <div className="absolute top-4 right-4 bg-ui-01 bg-opacity-90 border border-border-subtle rounded px-spacing-04 py-spacing-03">
        <div className="text-xs space-y-spacing-01">
          <p className="text-text-02">
            <strong className="text-text-01">Nodes:</strong> {graph.nodes.length}
          </p>
          <p className="text-text-02">
            <strong className="text-text-01">Edges:</strong> {graph.edges.length}
          </p>
          <p className="text-text-02">
            <strong className="text-text-01">Model:</strong> {graph.metadata.model}
          </p>
        </div>
      </div>
    </div>
  )
}
