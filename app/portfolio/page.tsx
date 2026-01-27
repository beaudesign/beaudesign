"use client";

import {
  BentoGrid,
  BentoCard,
  HeroContent,
  ProjectContent,
  MediaContent,
  LinkContent,
  TextBlockContent,
  StatContent,
  ScrollReveal,
} from "@/components/bento";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Palette,
  Layers,
  Zap,
  Globe,
} from "lucide-react";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-neutral-950 py-8 md:py-12 lg:py-16">
      <BentoGrid>
        {/* Hero Card */}
        <BentoCard size="hero" index={0}>
          <HeroContent
            subtitle="Creative Developer"
            title="Building digital experiences that inspire"
            description="I'm a designer and developer focused on creating thoughtful,
            user-centered digital products. Currently exploring the intersection of
            AI and design."
          />
        </BentoCard>

        {/* Featured Project - Large */}
        <BentoCard size="large" index={1} href="#">
          <ProjectContent
            title="Neural Canvas"
            description="AI-powered creative tool for generating and editing images with intuitive controls"
            tags={["AI/ML", "React", "WebGL"]}
            image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
          />
        </BentoCard>

        {/* Stats Cards */}
        <BentoCard size="small" index={2} className="bg-gradient-to-br from-violet-600/20 to-violet-900/20">
          <StatContent value="50+" label="Projects Shipped" icon={<Sparkles className="w-6 h-6" />} />
        </BentoCard>

        <BentoCard size="small" index={3} className="bg-gradient-to-br from-blue-600/20 to-blue-900/20">
          <StatContent value="8+" label="Years Experience" icon={<Code2 className="w-6 h-6" />} />
        </BentoCard>

        {/* Medium Project Card */}
        <BentoCard size="medium" index={4} href="#">
          <ProjectContent
            title="Design System"
            description="Comprehensive component library with accessibility at its core"
            tags={["Figma", "React", "Storybook"]}
            image="https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=400&fit=crop"
          />
        </BentoCard>

        {/* About Text Block */}
        <BentoCard size="medium" index={5}>
          <TextBlockContent
            title="Philosophy"
            content={
              <div className="space-y-4">
                <p>
                  Great design is invisible. It should feel effortless and intuitive,
                  guiding users toward their goals without friction.
                </p>
                <p>
                  I believe in the power of constraints to drive creativity, and in
                  building systems that scale gracefully.
                </p>
              </div>
            }
          />
        </BentoCard>

        {/* Social Links */}
        <BentoCard size="small" index={6} href="https://github.com">
          <LinkContent
            icon={<Github className="w-6 h-6" />}
            title="GitHub"
            description="Open source work"
          />
        </BentoCard>

        <BentoCard size="small" index={7} href="https://twitter.com">
          <LinkContent
            icon={<Twitter className="w-6 h-6" />}
            title="Twitter"
            description="Thoughts & updates"
          />
        </BentoCard>

        <BentoCard size="small" index={8} href="https://linkedin.com">
          <LinkContent
            icon={<Linkedin className="w-6 h-6" />}
            title="LinkedIn"
            description="Professional network"
          />
        </BentoCard>

        <BentoCard size="small" index={9} href="mailto:hello@example.com">
          <LinkContent
            icon={<Mail className="w-6 h-6" />}
            title="Email"
            description="Get in touch"
          />
        </BentoCard>

        {/* Featured Project - Large */}
        <BentoCard size="large" index={10} href="#">
          <ProjectContent
            title="Motion Lab"
            description="Interactive playground for exploring animation principles and micro-interactions"
            tags={["Framer Motion", "Three.js", "TypeScript"]}
            image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
          />
        </BentoCard>

        {/* Skills/Tools */}
        <BentoCard size="medium" index={11}>
          <div className="h-full p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Tools & Technologies</h3>
            <div className="flex-1 grid grid-cols-2 gap-3">
              {[
                { icon: <Code2 className="w-5 h-5" />, name: "TypeScript" },
                { icon: <Layers className="w-5 h-5" />, name: "Next.js" },
                { icon: <Palette className="w-5 h-5" />, name: "Tailwind" },
                { icon: <Zap className="w-5 h-5" />, name: "Framer Motion" },
                { icon: <Globe className="w-5 h-5" />, name: "Three.js" },
                { icon: <Sparkles className="w-5 h-5" />, name: "AI/ML" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                >
                  <span className="text-neutral-400">{tool.icon}</span>
                  <span className="text-sm text-neutral-300">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Medium Project */}
        <BentoCard size="medium" index={12} href="#">
          <ProjectContent
            title="Data Stories"
            description="Visualization platform for making complex data accessible and beautiful"
            tags={["D3.js", "Python", "Analytics"]}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
          />
        </BentoCard>

        {/* Video/Media Card */}
        <BentoCard size="medium" index={13}>
          <MediaContent
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop"
            alt="Creative workspace"
            overlay={
              <div>
                <h3 className="text-xl font-semibold text-white">Behind the Scenes</h3>
                <p className="text-sm text-neutral-300 mt-1">My creative process</p>
              </div>
            }
          />
        </BentoCard>

        {/* CTA Card */}
        <BentoCard
          size="large"
          index={14}
          className="bg-gradient-to-br from-violet-600/30 via-purple-600/20 to-blue-600/30"
        >
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let&apos;s Create Something Together
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-neutral-300 max-w-md mb-8">
                I&apos;m always interested in new projects and collaborations.
                Whether you have an idea or just want to chat, reach out.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Start a Conversation
              </a>
            </ScrollReveal>
          </div>
        </BentoCard>
      </BentoGrid>

      {/* Footer */}
      <footer className="mt-16 text-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Portfolio. Built with Next.js and Framer Motion.</p>
      </footer>
    </main>
  );
}
