'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/Preloader'
import { MouseTrail } from '@/components/MouseTrail'
import { AuroraBackground } from '@/components/AuroraBackground'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
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
      <SmoothScroll />
      <AuroraBackground />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero visible={heroVisible} />
<Connect />
      </main>
    </>
  )
}
