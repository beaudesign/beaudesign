"use client";

import { JournalHero } from "@/components/journal/journal-hero";
import { JournalNavigation } from "@/components/journal/journal-navigation";
import { ArticleGrid } from "@/components/journal/article-grid";
import { JournalFooter } from "@/components/journal/journal-footer";

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-journal-black text-journal-white">
      <JournalNavigation />
      <JournalHero />
      <ArticleGrid />
      <JournalFooter />
    </main>
  );
}
