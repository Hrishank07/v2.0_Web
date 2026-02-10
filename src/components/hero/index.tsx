'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Terminal, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { FloatingCard } from './floating-card'
import { DecryptButton } from './decrypt-button'
import { floatingCards, stats, ANIMATION_CONFIG } from './constants'

export function HeroSection() {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const hasAnimated = useRef(false)
  const { theme } = useTheme()
  const fullName = 'Hrishank Chhatbar'

  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      if (index <= fullName.length) {
        setTypedText(fullName.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, ANIMATION_CONFIG.typingSpeed)

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, ANIMATION_CONFIG.cursorBlinkSpeed)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <section id="home" className="relative flex min-h-[80vh] items-center py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:gap-16">
          {/* Hero Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="relative inline-block">
                <motion.div
                  className="absolute inset-0 bg-accent-primary/15 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.35, 0.2],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <h1 className="font-serif text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl relative">
                  <div className="flex flex-col items-center md:items-start">
                    {/* Opening tag */}
                    <span className="font-mono text-xl text-accent-primary md:text-4xl lg:text-5xl mb-1 md:mb-2">
                      &lt;dev&gt;
                    </span>
                    {/* Name with cursor */}
                    <span className="text-3xl md:text-5xl lg:text-6xl relative">
                      {typedText}
                      <motion.span
                        animate={{ opacity: showCursor ? 1 : 0 }}
                        transition={{ duration: 0.15 }}
                        className="inline-block w-0.5 h-8 md:h-12 lg:h-16 bg-accent-primary ml-1 align-middle"
                      />
                    </span>
                    {/* Closing tag */}
                    <span className="font-mono text-xl text-accent-primary md:text-4xl lg:text-5xl mt-1 md:mt-2">
                      /&gt;
                    </span>
                  </div>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-4 md:mt-6"
              >
                <h2 className="text-base md:text-xl lg:text-2xl text-accent-primary font-medium tracking-wide">
                  Software Engineer & Cloud Architect
                </h2>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="space-y-4"
            >
              <p className="mx-auto text-sm leading-relaxed text-muted-foreground md:mx-0 md:text-base lg:max-w-[540px]">
                I turn ambitious ideas into production-ready solutions. USC Masters graduate with AWS experience, seeking the next challenge to build systems that inspire.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/10 dark:border-accent-primary/15"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <Icon className="h-3.5 w-3.5 text-accent-primary" />
                      <span className="font-mono text-sm font-semibold text-foreground">{stat.value}</span>
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <Link
                href="#about"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-accent-primary/20 transition-all hover:shadow-lg hover:shadow-accent-primary/25 md:px-6 md:py-3"
              >
                <Terminal className="h-4 w-4" />
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <DecryptButton />
            </motion.div>
          </div>

          {/* Floating Cards Visual */}
          <div className="relative mt-12 h-[280px] w-full md:mt-0 md:flex-1 md:h-[440px] lg:h-[480px] hidden sm:block">
            <FloatingCard card={floatingCards[0]} style={{ top: '40px', right: '12%', width: '180px' }} delay={0} />
            <FloatingCard card={floatingCards[1]} style={{ top: '160px', right: '32%', width: '170px' }} delay={1} />
            <FloatingCard card={floatingCards[2]} style={{ top: '280px', right: '15%', width: '180px' }} delay={2} />

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-accent-primary/5 rounded-full blur-3xl dark:bg-accent-primary/10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
