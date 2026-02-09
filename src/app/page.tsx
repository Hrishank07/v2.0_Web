'use client'

import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { ThreeBackground } from '@/components/three-background'

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
