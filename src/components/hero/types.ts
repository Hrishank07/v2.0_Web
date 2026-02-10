// Types for Hero Section components

export interface FloatingCardData {
  icon: React.ComponentType<{ className?: string }>
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
  icon: React.ComponentType<{ className?: string }>
}

export interface DecryptState {
  isDecrypting: boolean
  decryptProgress: number
  showMatrix: boolean
  isDecrypted: boolean
  matrixChars: string[]
}
