'use client'

import dynamic from 'next/dynamic'

export const DynamicThreeBackground = dynamic(
    () => import('@/components/three-background').then((mod) => mod.ThreeBackground),
    { ssr: false }
)
