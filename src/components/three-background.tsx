'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null)
  const animationIdRef = useRef<number>(0)
  const isRunningRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

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
      speed: number
      rotationSpeed: number
      bridgePath: THREE.Vector3
      pathProgress: number
      pathIndex: number
    }[] = []

    const bridgePath: THREE.Vector3[] = []
    const pathSegments = 100
    for (let i = 0; i <= pathSegments; i++) {
      const t = i / pathSegments
      const y = 12 - t * 20
      const spreadMultiplier = 0.5 + t * t * 2.5
      const x = (t - 0.5) * spreadMultiplier
      const z = Math.cos(t * Math.PI * 2) * 2
      const depth = (t - 0.5) * 2
      bridgePath.push(new THREE.Vector3(x, y, z + depth))
    }

    for (let i = 0; i < 40; i++) {
      const shape = new THREE.Mesh(geometry, material.clone())
      const pathIndex = Math.floor(Math.random() * pathSegments)
      const pathPoint = bridgePath[pathIndex].clone()
      const t = pathIndex / pathSegments
      const spread = 0.3 + t * t * 2

      shape.position.x = pathPoint.x + (Math.random() - 0.5) * spread * 4
      shape.position.y = pathPoint.y + (Math.random() - 0.5) * 1.5
      shape.position.z = pathPoint.z + (Math.random() - 0.5) * 2
      shape.rotation.x = Math.random() * Math.PI
      shape.rotation.z = Math.random() * (Math.PI / 3)

      shapeData.push({
        speed: Math.random() * 0.004 + 0.002,
        rotationSpeed: Math.random() * 0.003 + 0.001,
        bridgePath: pathPoint.clone(),
        pathProgress: Math.random(),
        pathIndex,
      })

      scene.add(shape)
      shapes.push(shape)
    }

    camera.position.z = 3

    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5
      mouseY = e.clientY / window.innerHeight - 0.5
    }
    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      isRunningRef.current = true

      shapes.forEach((shape, index) => {
        const data = shapeData[index]
        shape.position.y -= data.speed
        shape.rotation.y += data.rotationSpeed

        if (shape.position.y < -10) {
          const newT = Math.random() * 0.3
          const newPathIndex = Math.floor(newT * pathSegments)
          const newPathPoint = bridgePath[newPathIndex].clone()
          const spread = 0.3 + newT * newT * 2

          shape.position.y = newPathPoint.y + (Math.random() - 0.5) * 2
          shape.position.x = newPathPoint.x + (Math.random() - 0.5) * spread * 4
          shape.position.z = newPathPoint.z + (Math.random() - 0.5) * 2
          data.pathIndex = newPathIndex
          data.pathProgress = Math.random()
        }
      })

      const targetX = mouseX * 0.5
      const targetY = -mouseY * 0.5
      camera.position.x += (targetX - camera.position.x) * 0.03
      camera.position.y += (targetY - camera.position.y) * 0.03
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationIdRef.current)
        isRunningRef.current = false
      } else if (!isRunningRef.current) {
        animate()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = Math.min(scrollY / scrollHeight, 1)
      const targetZ = 3 + scrollPercent * 3
      camera.position.z += (targetZ - camera.position.z) * 0.08
      camera.position.y += (-scrollPercent * 1 - camera.position.y) * 0.08
    }
    window.addEventListener('scroll', handleScroll)

    animate()

    return () => {
      cancelAnimationFrame(animationIdRef.current)
      isRunningRef.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      shapes.forEach(shape => { scene.remove(shape); shape.geometry.dispose() })
      material.dispose()
      geometry.dispose()
      materialRef.current = null
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(theme === 'dark' ? 0x9aad9e : 0x8fa392)
      materialRef.current.opacity = theme === 'dark' ? 0.7 : 0.6
    }
  }, [theme])

  return <div ref={containerRef} className="fixed inset-0 -z-10" aria-hidden="true" />
}
