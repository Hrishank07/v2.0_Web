'use client'

import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import dynamic from 'next/dynamic'

const ThreeBackground = dynamic(() => import('@/components/three-background').then(mod => mod.ThreeBackground), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ThreeBackground />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
