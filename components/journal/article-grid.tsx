"use client";

import { useState } from "react";
import Link from "next/link";

type Theme =
  | "computation"
  | "intelligence"
  | "simulation"
  | "stacks"
  | "sapience";

interface Article {
  id: string;
  title: string;
  author: string;
  designStudio: string;
  excerpt: string;
  theme: Theme;
  readTime: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: "planetary-stack",
    title: "The Planetary Stack: Infrastructure as Ontology",
    author: "Benjamin Bratton",
    designStudio: "Channel Studio",
    excerpt:
      "How planetary-scale computation reorganizes the relationship between geography, jurisdiction, and intelligence into new formations that exceed traditional political philosophy.",
    theme: "stacks",
    readTime: "24 min",
    featured: true,
  },
  {
    id: "recursive-worlds",
    title: "Recursive Worlds and Simulated Cosmologies",
    author: "Thomas Moynihan",
    designStudio: "Practise",
    excerpt:
      "On the philosophical implications of nested simulations and the recursive structure of computational reality.",
    theme: "simulation",
    readTime: "18 min",
  },
  {
    id: "synthetic-minds",
    title: "Synthetic Minds: Beyond Biological Cognition",
    author: "Blaise Agüera y Arcas",
    designStudio: "Accept & Proceed",
    excerpt:
      "Exploring the emergence of non-biological intelligence and its implications for understanding consciousness.",
    theme: "intelligence",
    readTime: "21 min",
  },
  {
    id: "cognitive-infrastructure",
    title: "Cognitive Infrastructure and Planetary Memory",
    author: "N. Katherine Hayles",
    designStudio: "Noviki",
    excerpt:
      "The entanglement of human cognition with computational systems and the emergence of distributed planetary memory.",
    theme: "computation",
    readTime: "16 min",
  },
  {
    id: "assembly-theory",
    title: "Assembly Theory and the Origins of Life",
    author: "Sara Imari Walker",
    designStudio: "Son La Pham",
    excerpt:
      "A new framework for understanding life, intelligence, and complexity through the lens of assembly theory.",
    theme: "sapience",
    readTime: "28 min",
    featured: true,
  },
  {
    id: "agentic-futures",
    title: "Agentic Futures: Synthetic Social Relations",
    author: "Bogna Konior",
    designStudio: "GIGA",
    excerpt:
      "How autonomous AI agents will transform social relations and produce new forms of synthetic sociality.",
    theme: "intelligence",
    readTime: "15 min",
  },
  {
    id: "hemispherical-computation",
    title: "Hemispherical Computation and Geopolitical AI",
    author: "Philip Maughan",
    designStudio: "Neo-Metabolism",
    excerpt:
      "The divergent development of AI systems across hemispheres and their implications for global computation.",
    theme: "stacks",
    readTime: "19 min",
  },
  {
    id: "silicon-ecologies",
    title: "Silicon Ecologies: Computation as Environment",
    author: "Chen Qiufan",
    designStudio: "Information Art",
    excerpt:
      "A speculative exploration of computational systems as ecological environments for emergent intelligence.",
    theme: "computation",
    readTime: "22 min",
  },
];

const themeLabels: Record<Theme, string> = {
  computation: "Planetary Computation",
  intelligence: "Synthetic Intelligence",
  simulation: "Recursive Simulation",
  stacks: "Hemispherical Stacks",
  sapience: "Planetary Sapience",
};

const allThemes: Theme[] = [
  "computation",
  "intelligence",
  "simulation",
  "stacks",
  "sapience",
];

export function ArticleGrid() {
  const [activeTheme, setActiveTheme] = useState<Theme | "all">("all");

  const filteredArticles =
    activeTheme === "all"
      ? articles
      : articles.filter((article) => article.theme === activeTheme);

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <section className="py-24 px-6 bg-journal-black-light">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-journal-white mb-3">
              Current Issue
            </h2>
            <p className="text-journal-muted max-w-xl">
              17 articles by twelve author-designer pairs, blending philosophy,
              speculative design, and experimental interface.
            </p>
          </div>

          {/* Theme filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTheme("all")}
              className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all ${
                activeTheme === "all"
                  ? "bg-journal-accent text-journal-black"
                  : "text-journal-muted hover:text-journal-white"
              }`}
            >
              All
            </button>
            {allThemes.map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all ${
                  activeTheme === theme
                    ? "bg-journal-accent text-journal-black"
                    : "text-journal-muted hover:text-journal-white"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Featured articles */}
        {featuredArticles.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredArticles.map((article) => (
              <FeaturedArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* Regular articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {regularArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-16 text-center">
          <button className="journal-button">
            View All Articles
            <svg
              className="ml-2 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/journal/articles/${article.id}`}>
      <article className="article-card rounded-lg p-6 h-full flex flex-col">
        {/* Theme tag */}
        <div className="mb-4">
          <span className={`theme-tag theme-tag-${article.theme}`}>
            {themeLabels[article.theme]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-journal-white mb-3 leading-tight">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-journal-muted mb-4 flex-grow line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="pt-4 border-t border-journal flex items-center justify-between">
          <div>
            <p className="text-sm text-journal-white">{article.author}</p>
            <p className="text-xs text-journal-subtle font-mono">
              {article.designStudio}
            </p>
          </div>
          <span className="text-xs text-journal-subtle font-mono">
            {article.readTime}
          </span>
        </div>
      </article>
    </Link>
  );
}

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/journal/articles/${article.id}`}>
      <article className="article-card rounded-lg overflow-hidden h-full">
        {/* Gradient header */}
        <div
          className={`h-32 relative ${
            article.theme === "computation"
              ? "bg-gradient-to-br from-journal-accent/20 to-transparent"
              : article.theme === "intelligence"
              ? "bg-gradient-to-br from-journal-purple/20 to-transparent"
              : article.theme === "simulation"
              ? "bg-gradient-to-br from-journal-blue/20 to-transparent"
              : article.theme === "stacks"
              ? "bg-gradient-to-br from-journal-cyan/20 to-transparent"
              : "bg-gradient-to-br from-journal-orange/20 to-transparent"
          }`}
        >
          {/* Featured badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono uppercase tracking-wider text-journal-accent bg-journal-black/50 rounded">
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Featured
            </span>
          </div>

          {/* Theme indicator */}
          <div className="absolute bottom-4 left-6">
            <span className={`theme-tag theme-tag-${article.theme}`}>
              {themeLabels[article.theme]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-medium text-journal-white mb-3 leading-tight">
            {article.title}
          </h3>

          <p className="text-sm text-journal-muted mb-6">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-journal-white font-medium">
                {article.author}
              </p>
              <p className="text-xs text-journal-subtle font-mono">
                Design: {article.designStudio}
              </p>
            </div>
            <div className="flex items-center gap-2 text-journal-accent">
              <span className="text-xs font-mono">{article.readTime}</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
