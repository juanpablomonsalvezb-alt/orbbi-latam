'use client'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import type { Points as PointsType } from 'three'

/* —— Sphere surface generator —— */
function sphereSurface(count: number, radius: number) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    arr[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = radius * Math.cos(phi)
  }
  return arr
}

/* —— Particle sphere —— */
function Sphere({ mouse }: { mouse: [number, number] }) {
  const ref   = useRef<PointsType>(null!)
  const outer = useRef<PointsType>(null!)

  const [inner] = useState(() => sphereSurface(4500, 1.45))
  const [atmo]  = useState(() => sphereSurface(1200, 2.2))

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.045
    ref.current.rotation.y += delta * 0.065

    /* soft mouse parallax */
    ref.current.rotation.x += (mouse[1] * 0.25 - ref.current.rotation.x) * 0.03
    ref.current.rotation.y += (mouse[0] * 0.25 - ref.current.rotation.y) * 0.03

    if (outer.current) {
      outer.current.rotation.x -= delta * 0.02
      outer.current.rotation.y -= delta * 0.03
    }
  })

  return (
    <>
      {/* Core sphere */}
      <Points ref={ref} positions={inner} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent color="#C9A96E"
          size={0.0045} sizeAttenuation
          depthWrite={false} opacity={0.85}
        />
      </Points>

      {/* Outer atmosphere — sparser, fainter */}
      <Points ref={outer} positions={atmo} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent color="#E8C987"
          size={0.003} sizeAttenuation
          depthWrite={false} opacity={0.30}
        />
      </Points>
    </>
  )
}

/* —— Camera rig with FOV zoom on mount —— */
function Rig({ mouse }: { mouse: [number, number] }) {
  const { camera } = useThree()
  useFrame((state, delta) => {
    camera.position.x += (mouse[0] * 0.2 - camera.position.x) * 0.04
    camera.position.y += (-mouse[1] * 0.2 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* —— Main export —— */
export default function HeroCanvas() {
  const [mouse, setMouse] = useState<[number, number]>([0, 0])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse([
        (e.clientX / window.innerWidth  - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      ])
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        /* fade edges so text reads perfectly */
        maskImage:
          'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Sphere mouse={mouse} />
          <Rig mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
