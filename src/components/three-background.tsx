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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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

    // Create a curved bridge path (like Einstein's spacetime bridge)
    const bridgePath: THREE.Vector3[] = []
    const pathSegments = 100
    for (let i = 0; i <= pathSegments; i++) {
      const t = i / pathSegments
      // Create a smooth curve from left to right with some height variation
      const x = (t - 0.5) * 25
      const y = Math.sin(t * Math.PI * 2) * 2 - 5
      const z = Math.cos(t * Math.PI * 4) * 2
      bridgePath.push(new THREE.Vector3(x, y, z))
    }

    const shapeCount = window.innerWidth < 768 ? 25 : 60
    const bridgeSegments = window.innerWidth < 768 ? 50 : 100

    for (let i = 0; i < shapeCount; i++) {
      const shape = new THREE.Mesh(geometry, material.clone())

      // Assign each hexagon to a random point on the bridge path
      const pathIndex = Math.floor(Math.random() * bridgeSegments)
      const pathPoint = bridgePath[Math.floor((pathIndex / bridgeSegments) * pathSegments)].clone()

      // Add some randomness around the path
      const spread = 1.5
      shape.position.x = pathPoint.x + (Math.random() - 0.5) * spread
      shape.position.y = pathPoint.y + (Math.random() - 0.5) * spread
      shape.position.z = pathPoint.z + (Math.random() - 0.5) * spread

      shape.rotation.x = Math.random() * Math.PI
      shape.rotation.z = Math.random() * (Math.PI / 3)

      const data = {
        speed: Math.random() * 0.008 + 0.004,
        rotationSpeed: Math.random() * 0.008 + 0.003,
        bridgePath: pathPoint.clone(),
        pathProgress: Math.random(), // Random starting position on their assigned path segment
        pathIndex: pathIndex,
      }
      shapeData.push(data)

      scene.add(shape)
      shapes.push(shape)
      shapesRef.current = shapes
    }

    camera.position.z = 5

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
        if (shape.position.y < -15) {
          shape.position.y = 12 + Math.random() * 5

          // Re-assign to a new random path point
          const newPathIndex = Math.floor(Math.random() * pathSegments)
          const newPathPoint = bridgePath[newPathIndex].clone()
          const spread = 1.5
          shape.position.x = newPathPoint.x + (Math.random() - 0.5) * spread
          shape.position.z = newPathPoint.z + (Math.random() - 0.5) * spread
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

    // Handle scroll parallax
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (rect.top < windowHeight && rect.top > -aboutSection.offsetHeight) {
          const parallaxValue = (windowHeight - rect.top) * 0.01
          camera.position.z = 5 + parallaxValue
        }
      }
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
