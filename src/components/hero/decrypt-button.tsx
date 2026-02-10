'use client'

import React, { useState } from 'react'
import { Lock, Unlock, Shield, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ANIMATION_CONFIG } from './constants'

export function DecryptButton() {
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [decryptProgress, setDecryptProgress] = useState(0)
  const [showMatrix, setShowMatrix] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  const generateMatrixChars = () => {
    return Array(50).fill(0).map(() =>
      ANIMATION_CONFIG.matrixChars[Math.floor(Math.random() * ANIMATION_CONFIG.matrixChars.length)]
    )
  }

  const handleDecrypt = async () => {
    if (isDecrypting || isDecrypted) return

    setIsDecrypting(true)
    setShowMatrix(true)
    setMatrixChars(generateMatrixChars())

    for (let i = 0; i <= 100; i += ANIMATION_CONFIG.decryptProgressStep) {
      await new Promise(resolve => setTimeout(resolve, ANIMATION_CONFIG.decryptProgressDelay))
      setDecryptProgress(i)

      if (i % ANIMATION_CONFIG.matrixUpdateInterval === 0) {
        setMatrixChars(generateMatrixChars())
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    setIsDecrypting(false)
    setIsDecrypted(true)
    setShowMatrix(false)

    setTimeout(() => {
      setIsDecrypted(false)
      setDecryptProgress(0)
    }, ANIMATION_CONFIG.resetDelay)
  }

  const getStatusText = () => {
    if (decryptProgress < 25) return 'Initializing...'
    if (decryptProgress < 50) return 'Bypassing...'
    if (decryptProgress < 75) return 'Decrypting...'
    return 'Almost there...'
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isDecrypted && !isDecrypting && (
          <motion.button
            key="decrypt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleDecrypt}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-background border-2 border-accent-primary px-5 py-2.5 text-sm font-semibold text-accent-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-accent-primary hover:text-primary-foreground md:px-6 md:py-3 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-accent-primary/10"
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            />

            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Lock className="h-4 w-4" />
            </motion.div>
            <span>Decrypt Your Access</span>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Shield className="h-4 w-4" />
            </motion.div>
          </motion.button>
        )}

        {isDecrypting && (
          <motion.div
            key="decrypting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="inline-flex flex-col items-center gap-3 px-8 py-4 rounded-2xl bg-background border-2 border-accent-primary shadow-xl"
          >
            {showMatrix && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="font-mono text-xs text-accent-primary/30 absolute inset-0 flex flex-wrap gap-1"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {matrixChars.map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </motion.div>
              </div>
            )}

            <motion.div
              animate={{ rotate: [0, -180, -180] }}
              transition={{ duration: 2 }}
              className="relative"
            >
              <Lock className="h-8 w-8 text-accent-primary" />
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <Unlock className="h-8 w-8 text-green-500" />
              </motion.div>
            </motion.div>

            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-primary to-green-500"
                initial={{ width: '0%' }}
                animate={{ width: `${decryptProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="text-xs font-mono text-muted-foreground">{getStatusText()}</p>
          </motion.div>
        )}

        {isDecrypted && (
          <motion.a
            key="download"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            href="/resume.pdf"
            download="Hrishank_Chhatbar_Resume.pdf"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-accent-primary/40 transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-2xl md:px-8 md:py-4 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Unlock className="h-4 w-4" />
            </motion.div>
            <span>Access Granted - Download Resume</span>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Download className="h-4 w-4" />
            </motion.div>

            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-green-400"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  x: [0, Math.cos((i * Math.PI * 2) / 6) * 30],
                  y: [0, Math.sin((i * Math.PI * 2) / 6) * 30],
                }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
