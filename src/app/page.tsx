'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/Preloader'
import { MouseTrail } from '@/components/MouseTrail'
import { AuroraBackground } from '@/components/AuroraBackground'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Signal } from '@/components/sections/Signal'
import { Work } from '@/components/sections/Work'
import { Connect } from '@/components/sections/Connect'

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setHeroVisible(true)
  }, [])

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <MouseTrail />
      <AuroraBackground />
      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero visible={heroVisible} />
        <Signal />
        <About />
        <Work />
        <Connect />
      </main>
    </>
  )
}
