import { Cloud, Code, Shield, GraduationCap, Building2 } from 'lucide-react'
import type { FloatingCardData, StatData } from './types'

// Floating cards data
export const floatingCards: FloatingCardData[] = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Scalable, fault-tolerant systems',
    stat: '99.9%',
    statLabel: 'Uptime',
    progress: 95,
    color: 'from-accent-primary to-accent-secondary',
    bgColor: 'from-accent-primary/15 to-accent-secondary/15',
  },
  {
    icon: Code,
    title: 'Full Stack',
    description: 'End-to-end application development',
    stat: '50+',
    statLabel: 'Projects',
    progress: 88,
    color: 'from-[#a8b5a7] to-[#8fa392]',
    bgColor: 'from-[#a8b5a7]/15 to-[#8fa392]/15',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Robust security implementations',
    stat: '0',
    statLabel: 'Vulnerabilities',
    progress: 100,
    color: 'from-[#9aad9e] to-[#7a8a7c]',
    bgColor: 'from-[#9aad9e]/15 to-[#7a8a7c]/15',
  },
]

// Stats data
export const stats: StatData[] = [
  { value: '3.97', label: 'Undergrad GPA', icon: GraduationCap },
  { value: '3.9', label: 'Masters GPA', icon: GraduationCap },
  { value: 'AWS', label: 'SDE Experience', icon: Building2 },
]

// Animation constants
export const ANIMATION_CONFIG = {
  typingSpeed: 70,
  cursorBlinkSpeed: 400,
  decryptProgressStep: 2,
  decryptProgressDelay: 40,
  matrixUpdateInterval: 10,
  resetDelay: 5000,
  matrixChars: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
} as const
