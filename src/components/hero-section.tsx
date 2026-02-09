'use client'

import { Cloud, Code, Shield, Terminal, Zap, ArrowRight, CheckCircle2, Activity, TrendingUp, Target, GraduationCap, Building2, Download } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useTheme } from 'next-themes'

const floatingCards = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Scalable, fault-tolerant systems',
    stat: '99.9%',
    statLabel: 'Uptime',
    progress: 95,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: Code,
    title: 'Full Stack',
    description: 'End-to-end application development',
    stat: '50+',
    statLabel: 'Projects',
    progress: 88,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-500/10 to-pink-500/10',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Robust security implementations',
    stat: '0',
    statLabel: 'Vulnerabilities',
    progress: 100,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/10 to-emerald-500/10',
  },
]

export function HeroSection() {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const hasAnimated = useRef(false)
  const { theme } = useTheme()
  const fullName = 'Hrishank Chhatbar'

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    let index = 0
    const typingInterval = setInterval(() => {
      if (index <= fullName.length) {
        setTypedText(fullName.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 70)

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 400)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  const stats = [
    { value: '3.97', label: 'Undergrad GPA', icon: GraduationCap },
    { value: '3.9', label: 'Masters GPA', icon: GraduationCap },
    { value: 'AWS', label: 'SDE Experience', icon: Building2 },
  ]

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
              {/* Animated glow effect behind name */}
              <div className="relative inline-block">
                <motion.div
                  className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <h1 className="font-serif text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl relative">
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                    <motion.span
                      className="font-mono text-2xl text-accent-primary md:text-4xl lg:text-5xl inline-block"
                      animate={{
                        rotate: [0, -2, 2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      &lt;dev&gt;
                    </motion.span>
                    <span className="text-3xl md:text-5xl lg:text-6xl relative">
                      {typedText}
                      <motion.span
                        animate={{ opacity: showCursor ? 1 : 0 }}
                        transition={{ duration: 0.1 }}
                        className="inline-block w-0.5 h-8 md:h-12 lg:h-16 bg-accent-primary ml-1 align-middle relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-accent-primary blur-sm"
                          animate={{ opacity: showCursor ? 0.5 : 0 }}
                        />
                      </motion.span>
                    </span>
                    <motion.span
                      className="font-mono text-2xl text-accent-primary md:text-4xl lg:text-5xl inline-block"
                      animate={{
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                    >
                      /&gt;
                    </motion.span>
                  </div>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-4 md:mt-6"
              >
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-accent-primary/10 px-3 py-1.5 text-xs md:text-sm border border-accent-primary/20 dark:border-accent-primary/30"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(143, 163, 146, 0.15)' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Terminal className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent-primary" />
                  </motion.div>
                  <span className="font-mono text-accent-primary">
                    software_engineer = true
                  </span>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </motion.div>
                </motion.div>

                <h2 className="mt-3 md:mt-4 text-base md:text-xl lg:text-2xl text-accent-primary font-medium tracking-wide">
                  Software Engineer & Cloud Architect
                </h2>
              </motion.div>
            </motion.div>

            {/* Enhanced Description with Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="space-y-5"
            >
              <p className="mx-auto text-sm leading-relaxed text-muted-foreground md:mx-0 md:text-base lg:max-w-[600px]">
                I turn ambitious ideas into production-ready solutions, recent Masters graduate from University of Southern California (USC), Los Angeles, and solid experience at Amazon Web Services (AWS) Seattle with Lambda Frontend invoke team, I am seeking out my next opportunity to work on the next set of challenges.
              </p>

              {/* Vision Statement */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="rounded-xl border border-accent-primary/20 bg-accent-primary/5 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Target className="h-5 w-5 text-accent-primary shrink-0 mt-0.5" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">My Vision</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      To engineer systems that dont just scale they inspire. From microsecond precision cloud infrastructure to AI powered applications I build the bridge between technical excellence and human experience. My journey is driven by one belief. The best code is written with purpose not just function.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Impact Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary/5 border border-accent-primary/10 dark:border-accent-primary/20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: theme === 'dark' ? 'rgba(154, 173, 158, 0.15)' : 'rgba(143, 163, 146, 0.1)' }}
                    >
                      <Icon className="h-4 w-4 text-accent-primary" />
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-lg font-bold text-foreground">{stat.value}</span>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <Link
                href="#about"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-accent-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-primary/30 md:px-6 md:py-3"
              >
                <Terminal className="h-4 w-4" />
                Learn More
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
              <a
                href="/resume.pdf"
                download="Hrishank_Chhatbar_Resume.pdf"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-background border-2 border-accent-primary px-5 py-2.5 text-sm font-semibold text-accent-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-accent-primary hover:text-primary-foreground md:px-6 md:py-3"
              >
                <Download className="h-4 w-4" />
                Resume
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Download className="h-4 w-4" />
                </motion.div>
              </a>
            </motion.div>
          </div>

          {/* Hero Visual - Enhanced Floating Cards */}
          <div className="relative mt-12 h-[340px] w-full md:mt-0 md:flex-1 md:h-[500px] lg:h-[540px]">
            <FloatingCard
              card={floatingCards[0]}
              style={{ top: '10px', right: '5%', width: '230px' }}
              delay={0}
              index={0}
            />
            <FloatingCard
              card={floatingCards[1]}
              style={{ top: '140px', right: '25%', width: '210px' }}
              delay={2.5}
              index={1}
            />
            <FloatingCard
              card={floatingCards[2]}
              style={{ top: '270px', right: '10%', width: '220px' }}
              delay={5}
              index={2}
            />

            {/* Decorative background elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl dark:bg-accent-primary/10"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingCard({
  card,
  style,
  delay,
  index,
}: {
  card: (typeof floatingCards)[0]
  style: React.CSSProperties
  delay: number
  index: number
}) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const Icon = card.icon

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Use system theme if theme is undefined (initial load)
  const currentTheme = theme === 'undefined' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      className="absolute overflow-hidden rounded-2xl border border-border backdrop-blur-xl dark:border-border/50 dark:shadow-black/50"
      style={{
        ...style,
        background: isDark
          ? 'rgba(36, 42, 51, 0.98)'
          : 'rgba(255, 255, 255, 0.98)',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{
        y: [-12, 0, -12],
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 2,
        borderColor: isDark ? 'rgba(154, 173, 158, 0.5)' : 'rgba(143, 163, 146, 0.3)',
        boxShadow: isDark
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          : '0 25px 50px -12px rgba(143, 163, 146, 0.25)',
      }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-0 hover:opacity-100 transition-opacity duration-300 dark:opacity-10 dark:hover:opacity-20`} />

      <div className="relative p-5">
        {/* Icon with pulsing glow */}
        <div className="relative inline-block mb-4">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${card.color} blur-xl opacity-50`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg`}
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
          </motion.div>
        </div>

        <h3 className="font-serif text-lg font-semibold text-foreground">{card.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{card.description}</p>

        {/* Stat display */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold font-mono text-foreground">{card.stat}</div>
            <div className="text-xs text-muted-foreground">{card.statLabel}</div>
          </div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Activity className="h-5 w-5 text-accent-primary" />
          </motion.div>
        </div>

        {/* Animated progress bar */}
        <div className="mt-3">
          <div className="h-1.5 bg-muted/50 dark:bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${card.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${card.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Animated code snippet */}
        <motion.div
          className="mt-3 rounded-lg bg-muted/30 dark:bg-muted/50 p-2.5 font-mono text-[9px] leading-relaxed border border-border/30 dark:border-border/50"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 1 }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          <span className="text-accent-primary/80 dark:text-accent-primary/60">const</span>{' '}
          <span className="text-blue-600 dark:text-blue-400">{card.title.toLowerCase().replace(' ', '_')}</span> = <span className="text-green-600 dark:text-green-400">{'{'}</span>
          <br />
          <span className="ml-2 text-purple-600 dark:text-purple-400">status</span>: <span className="text-green-600 dark:text-green-400">"active"</span>,
          <br />
          <span className="ml-2 text-purple-600 dark:text-purple-400">optimization</span>: <span className="text-orange-600 dark:text-orange-400">{card.progress}%</span>
          <br />
          <span className="text-green-600 dark:text-green-400">{'}'}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
