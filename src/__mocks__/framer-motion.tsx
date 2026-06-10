/**
 * Framer Motion mock for Jest.
 * Renders motion.* components as plain HTML elements, stripping framer-only props
 * so React doesn't warn about unknown DOM attributes.
 */
import React from 'react'

const MOTION_PROPS = new Set([
  'animate', 'initial', 'exit', 'variants', 'transition',
  'whileHover', 'whileTap', 'whileFocus', 'whileInView', 'whileDrag',
  'drag', 'dragConstraints', 'dragElastic', 'dragMomentum',
  'layout', 'layoutId', 'onAnimationComplete', 'onUpdate',
  'viewport', 'style',
])

function stripMotionProps(props: Record<string, unknown>) {
  const clean: Record<string, unknown> = {}
  for (const key of Object.keys(props)) {
    if (!MOTION_PROPS.has(key)) clean[key] = props[key]
  }
  return clean
}

const motion = new Proxy({}, {
  get(_target, key: string) {
    return React.forwardRef(
      ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>, ref: React.Ref<unknown>) =>
        React.createElement(key as string, { ref, ...stripMotionProps(props) }, children)
    )
  },
})

const AnimatePresence = ({ children }: React.PropsWithChildren) =>
  React.createElement(React.Fragment, null, children)

export { motion, AnimatePresence }
export default { motion, AnimatePresence }
