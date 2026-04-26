'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/Preloader'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { Portfolio } from '@/components/sections/Portfolio'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false)
  const handlePreloaderComplete = useCallback(() => setHeroVisible(true), [])

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <SmoothScroll />
      <main style={{ position: 'relative', zIndex: 1, background: '#080A0F' }}>
        <Hero visible={heroVisible} />
        <Portfolio />
        <Services />
        <Process />
        <Contact />
      </main>
    </>
  )
}
