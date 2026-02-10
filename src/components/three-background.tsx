'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null)
  const shapesRef = useRef<THREE.Mesh[]>([])
  const animationIdRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // Create falling geometric shapes (hexagons using cylinder)
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 6)
    const material = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x9aad9e : 0x8fa392,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.7 : 0.6,
    })
    materialRef.current = material

    const shapes: THREE.Mesh[] = []
    const shapeData: {
      speed: number;
      rotationSpeed: number;
      bridgePath: THREE.Vector3;
      pathProgress: number;
      pathIndex: number;
    }[] = []

    // Create a vertical bridge/tree path (narrow at top, wide at bottom)
    const bridgePath: THREE.Vector3[] = []
    const pathSegments = 100
    for (let i = 0; i <= pathSegments; i++) {
      const t = i / pathSegments

      // Vertical structure: top to bottom
      // Top (t=0) is high Y, Bottom (t=1) is low Y
      const y = 12 - (t * 20) // Top: 12, Bottom: -8

      // Width increases as we go down (tree branches / bridge base)
      // t=0 (top) → narrow, t=1 (bottom) → wide
      const spreadMultiplier = 0.5 + (t * t * 2.5) // Expands quadratically

      // Create the vertical bridge/tree shape
      const x = (t - 0.5) * spreadMultiplier // Expands outward from center
      const z = Math.cos(t * Math.PI * 2) * 2 // Depth for 3D effect
      const depth = (t - 0.5) * 2 // Forward/backward depth

      bridgePath.push(new THREE.Vector3(x, y, z + depth))
    }

    // Create falling hexagons (cleaner look with fewer shapes)
    const shapeCount = 40

    for (let i = 0; i < shapeCount; i++) {
      const shape = new THREE.Mesh(geometry, material.clone())

      const pathIndex = Math.floor(Math.random() * pathSegments)
      const pathPoint = bridgePath[pathIndex].clone()
      const t = pathIndex / pathSegments

      // Spread increases as we go down (tree branches / bridge base)
      const spread = 0.3 + (t * t * 2)

      // Distribute hexagons within the vertical V shape
      const xSpread = (Math.random() - 0.5) * spread * 4
      const zSpread = (Math.random() - 0.5) * 2

      shape.position.x = pathPoint.x + xSpread
      shape.position.y = pathPoint.y + (Math.random() - 0.5) * 1.5
      shape.position.z = pathPoint.z + zSpread

      shape.rotation.x = Math.random() * Math.PI
      shape.rotation.z = Math.random() * (Math.PI / 3)

      const data = {
        speed: Math.random() * 0.004 + 0.002, // Slower, gentler movement
        rotationSpeed: Math.random() * 0.003 + 0.001, // Slower rotation
        bridgePath: pathPoint.clone(),
        pathProgress: Math.random(),
        pathIndex: pathIndex,
      }
      shapeData.push(data)

      scene.add(shape)
      shapes.push(shape)
    }
    shapesRef.current = shapes

    camera.position.z = 3 // Start closer (zoomed in on top of tree/bridge)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5
      mouseY = event.clientY / window.innerHeight - 0.5
    }

    document.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      shapesRef.current.forEach((shape, index) => {
        const data = shapeData[index]

        // Falling effect - smoother with gentle easing
        shape.position.y -= data.speed

        // Rotation - smoother and slower
        shape.rotation.y += data.rotationSpeed

        // Reset position when out of view
        if (shape.position.y < -10) {
          // Reset to near top of vertical structure
          const newT = Math.random() * 0.3 // Keep mostly at top
          const newPathIndex = Math.floor(newT * pathSegments)
          const newPathPoint = bridgePath[newPathIndex].clone()

          shape.position.y = newPathPoint.y + (Math.random() - 0.5) * 2
          const spread = 0.3 + (newT * newT * 2)

          shape.position.x = newPathPoint.x + (Math.random() - 0.5) * spread * 4
          shape.position.z = newPathPoint.z + (Math.random() - 0.5) * 2
          data.pathIndex = newPathIndex
          data.pathProgress = Math.random()
        }
      })

      // Subtle camera movement based on mouse position - smoother
      const targetX = mouseX * 0.5
      const targetY = -mouseY * 0.5
      camera.position.x += (targetX - camera.position.x) * 0.03
      camera.position.y += (targetY - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Handle scroll parallax - Smoother, more streamlined zoom
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = Math.min(scrollY / scrollHeight, 1)

      // Smoother zoom out: z goes from 3 (zoomed in) to 6 (zoomed out)
      const targetZ = 3 + (scrollPercent * 3)
      camera.position.z += (targetZ - camera.position.z) * 0.08 // Higher easing for smoother transition

      // Gentler vertical movement
      camera.position.y += (-scrollPercent * 1 - camera.position.y) * 0.08
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)

      shapes.forEach((shape) => {
        scene.remove(shape)
        shape.geometry.dispose()
      })
      material.dispose()
      geometry.dispose()
      materialRef.current = null
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  // Update material color when theme changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(theme === 'dark' ? 0x9aad9e : 0x8fa392)
      materialRef.current.opacity = theme === 'dark' ? 0.7 : 0.6
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
