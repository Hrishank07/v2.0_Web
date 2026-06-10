import { useReducedMotion } from 'framer-motion'

/**
 * Returns transition overrides that respect prefers-reduced-motion.
 * Pass the result as the `transition` prop on any motion element.
 *
 * Usage:
 *   const t = useMotionTransition()
 *   <motion.div transition={t({ duration: 0.6 })} />
 */
export function useMotionTransition() {
  const reduce = useReducedMotion()
  return (config: Record<string, unknown> = {}) =>
    reduce ? { duration: 0, repeat: 0 } : config
}
