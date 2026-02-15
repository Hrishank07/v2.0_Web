import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { DynamicThreeBackground } from '@/components/dynamic-background'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <DynamicThreeBackground />
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
