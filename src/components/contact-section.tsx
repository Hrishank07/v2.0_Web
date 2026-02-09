'use client'

import { Terminal, Send, Mail, Linkedin, Github, Code2, Wifi, Server, Cpu, Activity, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [commandOutput, setCommandOutput] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    
    // Simulate terminal output
    const outputs = [
      '> Initializing secure connection...',
      '> Encrypting data stream...',
      '> Validating email format...',
      '> Sending transmission...',
      '> Message delivered successfully! ✓'
    ]

    for (let i = 0; i < outputs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400))
      setCommandOutput(prev => [...prev, outputs[i]])
    }

    setIsSending(false)
    setShowSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    
    setTimeout(() => {
      setShowSuccess(false)
      setCommandOutput([])
    }, 4000)
  }

  return (
    <section id="contact" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-5">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-accent-primary/10 px-4 py-1.5 text-xs font-mono font-medium text-accent-primary mb-4">
            INITIATE_CONTACT
          </span>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            Get In Touch
          </h2>
        </motion.div>

        {/* Terminal Interface */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal Window */}
          <div className="rounded-2xl border-2 border-border bg-background overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  hrishank@portfolio:~$
                </span>
              </div>
              
              {/* System Status Indicators */}
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Wifi className="h-3.5 w-3.5 text-green-500" />
                  <span className="font-mono">ONLINE</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Server className="h-3.5 w-3.5 text-blue-500" />
                  <span className="font-mono">ACTIVE</span>
                </motion.div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 bg-background">
              {/* Welcome Message */}
              <div className="mb-6 font-mono text-sm">
                <p className="text-accent-primary">$</p>
                <p className="text-muted-foreground ml-4">
                  Welcome to the contact terminal. Please enter your message below.
                </p>
                <p className="text-accent-primary">$</p>
                <p className="text-muted-foreground ml-4">
                  <span className="text-yellow-500">Tip:</span> All transmissions are encrypted end-to-end.
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-mono text-accent-primary">
                      <Code2 className="h-4 w-4" />
                      <span>name =</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder='"Your Name"'
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-mono text-accent-primary">
                      <Mail className="h-4 w-4" />
                      <span>email =</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder='"your@email.com"'
                      className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-mono text-accent-primary">
                    <Terminal className="h-4 w-4" />
                    <span>message =</span>
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder='"Your message here..."'
                    rows={4}
                    className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending || showSuccess}
                  className="group flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-accent-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Activity className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Execute Send Command</span>
                    </>
                  )}
                </button>
              </form>

              {/* Command Output */}
              <AnimatePresence>
                {commandOutput.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 rounded-lg bg-black/5 dark:bg-black/20 p-4 font-mono text-xs space-y-1"
                  >
                    {commandOutput.map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={
                          line.includes('✓') 
                            ? 'text-green-500' 
                            : line.includes('>') 
                            ? 'text-accent-primary' 
                            : 'text-muted-foreground'
                        }
                      >
                        {line}
                      </motion.p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Links - Terminal Style */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="mb-4 text-sm font-mono text-muted-foreground">
                  <span className="text-accent-primary">$</span> <span className="text-yellow-500">OR</span> connect via:
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://linkedin.com/in/hrishankk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-mono text-foreground hover:border-accent-primary hover:text-accent-primary transition-all"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>linkedin</span>
                  </a>
                  <a
                    href="https://github.com/hrishankk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-mono text-foreground hover:border-accent-primary hover:text-accent-primary transition-all"
                  >
                    <Github className="h-4 w-4" />
                    <span>github</span>
                  </a>
                  <a
                    href="mailto:hchhatba@usc.edu"
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-mono text-foreground hover:border-accent-primary hover:text-accent-primary transition-all"
                  >
                    <Mail className="h-4 w-4" />
                    <span>email</span>
                  </a>
                </div>
              </div>

              {/* System Info Footer */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-3.5 w-3.5" />
                    <span>System Ready</span>
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-accent-primary">v1.0.0</span>
                  <span>|</span>
                  <span>Uptime: 99.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Code Particles */}
          <div className="mt-8 grid grid-cols-4 md:grid-cols-8 gap-2 opacity-30">
            {[...Array(32)].map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-accent-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
