'use client'

import { Database, Bot, ExternalLink, GitBranch, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const projects = [
  {
    icon: Zap,
    title: 'Hybrid Semantic Acceleration Layer (HSAL)',
    description: 'High-performance orchestration layer optimizing LLM request pipelines with two-tier deterministic caching (L1 hash-based fast path, L2 semantic warm path), reducing embedding infrastructure load by 30%-60% in high-repeat environments.',
    tags: ['Python', 'LLM', 'Redis', 'Vector DB', 'Caching'],
    gradient: 'from-accent-primary/20 to-accent-secondary/20',
    iconColor: 'text-accent-primary',
    link: 'https://github.com/Hrishank07/HSAL',
  },
  {
    icon: Bot,
    title: 'AI-Powered Document Q&A',
    description: 'Architected a serverless Retrieval-Augmented Generation (RAG) pipeline using AWS Bedrock for embeddings and vector search, enabling low-latency natural language querying of unstructured documents.',
    tags: ['Python', 'AWS Bedrock', 'Lambda', 'Terraform'],
    gradient: 'from-[#a8b5a7]/20 to-[#8fa392]/20',
    iconColor: 'text-[#a8b5a7]',
    link: 'https://github.com/Hrishank07/RAG_Based_QnA',
  },
  {
    icon: Database,
    title: 'Distributed Key-Value Store',
    description: 'Implemented the Raft consensus algorithm from scratch to manage leader election, log replication, and state machine safety across a distributed cluster with fault tolerance.',
    tags: ['Java', 'Docker', 'Multithreading', 'Raft'],
    gradient: 'from-[#9aad9e]/20 to-[#7a8a7c]/20',
    iconColor: 'text-[#9aad9e]',
    link: 'https://github.com/Hrishank07/distributed-cache-raft',
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-5">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-accent-primary/10 px-4 py-1.5 text-xs font-mono font-medium text-accent-primary mb-4">
            FEATURED_WORK
          </span>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <ProjectCard key={index} project={project} index={index} Icon={Icon} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'

function ProjectCard({
  project,
  index,
  Icon,
}: {
  project: typeof projects[0]
  index: number
  Icon: any
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-md transition-all hover:-translate-y-2.5 hover:shadow-2xl dark:bg-card/80"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {/* Gradient background overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none`}
        />

        {/* Project Image/Icon Area */}
        <div className="relative flex h-52 items-center justify-center bg-muted/50 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }} />
          </div>

          {/* Icon container */}
          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-background shadow-lg"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon
              className={`h-10 w-10 transition-colors ${project.iconColor} group-hover:text-accent-primary`}
              strokeWidth={1.5}
            />
          </motion.div>

          {/* External link indicator */}
          <motion.div
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ rotate: 45 }}
          >
            <ExternalLink className="h-4 w-4 text-accent-primary" />
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="relative p-6">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-semibold leading-tight flex-1">
              {project.title}
            </h3>
            <GitBranch className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                className="inline-flex items-center gap-1 rounded-full bg-accent-primary/10 px-3 py-1 text-xs font-medium text-accent-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="h-2.5 w-2.5" />
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Code snippet decoration */}
          <div className="mt-4 rounded-lg bg-muted/50 p-3 font-mono text-[10px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <span className="opacity-50">
                {`// ${project.title.toLowerCase().replace(/[^a-z]/g, '_')}.ts`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
