'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/Preloader'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { Portfolio } from '@/components/sections/Portfolio'
import { Contact } from '@/components/sections/Contact'
import { SeoContent } from '@/components/SeoContent'

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false)
  const handlePreloaderComplete = useCallback(() => setHeroVisible(true), [])

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <SmoothScroll />
      <SeoContent />
      <main style={{ position: 'relative', zIndex: 1, background: '#080A0F' }}>
        <Hero visible={heroVisible} />
        <Portfolio />
        <Contact />
      </main>
    </>
  )
}
