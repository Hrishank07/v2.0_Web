'use client'

import { Cloud, Code, Database, Brain, Zap, Award, Briefcase, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const skills = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Scalable, fault-tolerant systems',
    color: 'from-accent-primary/20 to-accent-secondary/20',
    iconColor: 'text-accent-primary',
  },
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'End-to-end applications with modern frameworks',
    color: 'from-[#a8b5a7]/20 to-[#8fa392]/20',
    iconColor: 'text-[#a8b5a7]',
  },
  {
    icon: Database,
    title: 'AWS & Serverless',
    description: 'Cloud solutions improving performance by 35%',
    color: 'from-[#9aad9e]/20 to-[#7a8a7c]/20',
    iconColor: 'text-[#9aad9e]',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'GPT-powered applications with vector search',
    color: 'from-[#b8c4bb]/20 to-[#a8b5a7]/20',
    iconColor: 'text-[#b8c4bb]',
  },
]

const highlights = [
  {
    icon: Award,
    title: 'Academic Excellence',
    description: '3.97/4.0 undergraduate GPA and 3.9/4.0 Masters GPA from USC, demonstrating consistent commitment to learning and growth.',
  },
  {
    icon: Briefcase,
    title: 'Industry Experience',
    description: 'Hands-on experience at AWS Lambda team in Seattle, working on production systems that serve millions of users globally.',
  },
  {
    icon: Zap,
    title: 'Core Skills',
    description: 'Java, Python, AWS (Lambda, DynamoDB, S3, EC2), Spring Boot, Docker, Kubernetes, Terraform, Microservices, Distributed Systems, and System Design expertise.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-5">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-accent-primary/10 px-4 py-1.5 text-xs font-mono font-medium text-accent-primary mb-4">
              ABOUT_ME
            </span>
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              About Me
            </h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Software Engineer & Cloud Architect
            </p>
          </motion.div>
        </div>

        {/* Recruiter-Focused Introduction */}
        <div className="mx-auto mb-16 max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 className="h-6 w-6 text-accent-primary shrink-0 mt-1" />
                </motion.div>
                <h3 className="font-serif text-2xl font-semibold">What I Bring to the Table</h3>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Im a recent Masters graduate in Engineering Management from the University of Southern California (USC) with a minor in Business Analytics. My academic journey began at Maharashtra Institute of Technology where I graduated with a 3.97/4.0 GPA, establishing a strong foundation in electrical and computer engineering.
                </p>

                <p>
                  What sets me apart is the combination of my technical expertise and real-world experience at Amazon Web Services. During my internship with the Lambda Frontend invoke team in Seattle, I worked on production systems that handle millions of requests. This experience gave me firsthand exposure to enterprise-scale software development and the importance of building systems that are not just functional, but optimized for performance and reliability.
                </p>

                <p>
                  My passion lies at the intersection of cloud architecture and AI integration. Whether its designing serverless solutions that achieve microsecond-level latency or building full-stack applications powered by GPT and vector search, I thrive on solving complex problems. I believe the best engineers are those who can bridge the gap between technical excellence and user experience, creating solutions that are both powerful and intuitive.
                </p>

                <p className="font-medium text-foreground pt-2 border-t border-border/50">
                  Im now seeking my next opportunity to bring my skills in cloud architecture, full-stack development, and AI integration to a team where I can make meaningful contributions and continue growing as an engineer.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Highlights */}
        <div className="mb-20">
          <motion.h3
            className="mb-8 text-center font-serif text-3xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Key Highlights
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-2xl border border-border bg-card/95 p-6 transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-card/95"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-primary/10 transition-colors group-hover:bg-accent-primary/20">
                    <Icon className="h-7 w-7 text-accent-primary" strokeWidth={1.5} />
                  </div>
                  <h4 className="mb-2 font-serif text-lg font-semibold">{highlight.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <motion.h3
            className="mb-10 text-center font-serif text-3xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Competencies
          </motion.h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <SkillCard key={index} skill={skill} index={index} Icon={Icon} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill, index, Icon }: { skill: typeof skills[0]; index: number; Icon: any }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/95 p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-card/95"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity group-hover:opacity-100`}
      />

      <div className="relative">
        {/* Icon container with animation */}
        <motion.div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-primary/10 transition-colors group-hover:bg-background"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon
            className={`h-8 w-8 transition-colors ${skill.iconColor} group-hover:text-accent-primary`}
            strokeWidth={1.5}
          />
        </motion.div>

        <h4 className="mb-2 font-serif text-lg font-semibold">{skill.title}</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>

        {/* Tech stack badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
            {skill.title.split(' ')[0].toUpperCase()}
          </span>
          <Zap className="h-3 w-3 text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  )
}
