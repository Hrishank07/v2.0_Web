'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import type { FloatingCardData } from './types'

interface FloatingCardProps {
  card: FloatingCardData
  style: React.CSSProperties
  delay: number
}

export function FloatingCard({ card, style, delay }: FloatingCardProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const Icon = card.icon

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'undefined' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  if (!mounted) return null

  return (
    <motion.div
      className="absolute overflow-hidden rounded-2xl border backdrop-blur-xl"
      style={{
        ...style,
        background: isDark
          ? 'rgba(26, 31, 37, 0.95)'
          : 'rgba(248, 249, 250, 0.95)',
        borderColor: isDark
          ? 'rgba(154, 173, 158, 0.3)'
          : 'rgba(143, 163, 146, 0.25)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(143, 163, 146, 0.1)',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{
        y: [-8, 0, -8],
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      whileHover={{
        scale: 1.05,
        rotate: 1,
        borderColor: isDark ? 'rgba(154, 173, 158, 0.5)' : 'rgba(143, 163, 146, 0.4)',
        boxShadow: isDark
          ? '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(154, 173, 158, 0.1)'
          : '0 12px 40px rgba(143, 163, 146, 0.15), 0 0 0 1px rgba(143, 163, 146, 0.08)',
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-0 hover:opacity-100 transition-opacity duration-300 dark:opacity-5 dark:hover:opacity-10`} />

      <div className="relative p-5">
        <div className="relative inline-block mb-4">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${card.color} blur-xl opacity-30`}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-md`}
            whileHover={{ rotate: 10, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
          </motion.div>
        </div>

        <h3 className="font-serif text-base font-semibold text-foreground mb-1.5">{card.title}</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{card.description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">{card.statLabel}</span>
            <span className="font-mono text-sm font-bold text-accent-primary">{card.stat}</span>
          </div>
          <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${card.progress}%` }}
              transition={{ duration: 1.5, delay: delay + 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
