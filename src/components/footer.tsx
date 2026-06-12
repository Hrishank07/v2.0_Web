import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 py-10 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-5 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/Hrishank07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-accent-primary"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/hrishankk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-accent-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:hchhatba@usc.edu"
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-accent-primary"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Hrishank Chhatbar. All rights reserved.</p>
        <p className="font-mono text-xs opacity-60">Built with Next.js, Tailwind CSS &amp; Three.js</p>
      </div>
    </footer>
  )
}
