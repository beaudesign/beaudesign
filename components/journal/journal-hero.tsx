"use client";

import { useEffect, useRef } from "react";

export function JournalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      particles = [];
      const numParticles = 80;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      ctx.strokeStyle = "rgba(0, 255, 136, 0.05)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = (1 - dist / 120) * 0.3;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
        ctx.fill();

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Volume indicator */}
        <div className="mb-8 reveal-up">
          <span className="inline-block px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-journal-muted border border-journal rounded">
            Volume 2025 · Spring Issue
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 reveal-up" style={{ animationDelay: "0.1s" }}>
          <span className="block text-journal-white">Antikythera</span>
          <span className="block text-journal-muted mt-2 text-3xl md:text-4xl lg:text-5xl">
            Journal
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-journal-muted max-w-3xl mx-auto mb-4 reveal-up" style={{ animationDelay: "0.2s" }}>
          Philosophy of Planetary Computation
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-journal-subtle max-w-2xl mx-auto mb-12 leading-relaxed reveal-up" style={{ animationDelay: "0.3s" }}>
          A peer-reviewed journal dedicated to developing new interdisciplinary thought
          engaging the conjunction and co-evolution of computational technologies,
          biological and non-biological life, and intelligence at all scales.
        </p>

        {/* Research themes */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal-up" style={{ animationDelay: "0.4s" }}>
          <span className="theme-tag theme-tag-computation">Planetary Computation</span>
          <span className="theme-tag theme-tag-intelligence">Synthetic Intelligence</span>
          <span className="theme-tag theme-tag-simulation">Recursive Simulation</span>
          <span className="theme-tag theme-tag-stacks">Hemispherical Stacks</span>
          <span className="theme-tag theme-tag-sapience">Planetary Sapience</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-up" style={{ animationDelay: "0.5s" }}>
          <button className="journal-button-primary journal-button">
            Explore Articles
          </button>
          <button className="journal-button">
            About the Journal
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 reveal-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex flex-col items-center gap-2 text-journal-subtle">
            <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-journal-white/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-journal rounded-full opacity-10" />
      <div className="absolute bottom-40 right-20 w-64 h-64 border border-journal-accent/20 rounded-full opacity-20" />
      <div className="absolute top-1/2 right-10 w-px h-40 bg-gradient-to-b from-transparent via-journal-accent/30 to-transparent" />
    </section>
  );
}
