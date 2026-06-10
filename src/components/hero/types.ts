import type { LucideIcon } from 'lucide-react'

export interface FloatingCardData {
  icon: LucideIcon
  title: string
  description: string
  stat: string
  statLabel: string
  progress: number
  color: string
  bgColor: string
}

export interface StatData {
  value: string
  label: string
  icon: LucideIcon
}

export interface DecryptState {
  isDecrypting: boolean
  decryptProgress: number
  showMatrix: boolean
  isDecrypted: boolean
  matrixChars: string[]
}
