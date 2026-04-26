'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/Preloader'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { Challenge } from '@/components/sections/Challenge'
import { Portfolio } from '@/components/sections/Portfolio'
import { BriefBuilder } from '@/components/sections/BriefBuilder'
import { Calculator } from '@/components/sections/Calculator'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Drops } from '@/components/sections/Drops'
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
        <SocialProof />
        <Challenge />
        <Portfolio />
        <BriefBuilder />
        <Calculator />
        <Services />
        <Process />
        <Drops />
        <Contact />
      </main>
    </>
  )
}
