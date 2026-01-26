'use client';

import { Module } from '@/lib/grid-types';
import { HeroModule } from './modules/hero-module';
import { NavModule } from './modules/nav-module';
import { TextModule } from './modules/text-module';
import { ImageModule } from './modules/image-module';
import { StatsModule } from './modules/stats-module';
import { ChartModule } from './modules/chart-module';
import { ClockModule } from './modules/clock-module';
import { WeatherModule } from './modules/weather-module';
import { SocialModule } from './modules/social-module';
import { EmbedModule } from './modules/embed-module';
import { CustomModule } from './modules/custom-module';

interface ModuleRendererProps {
  module: Module;
}

export function ModuleRenderer({ module }: ModuleRendererProps) {
  const { type, content } = module;

  switch (type) {
    case 'hero':
      return <HeroModule content={content} />;
    case 'nav':
      return <NavModule content={content} />;
    case 'text':
      return <TextModule content={content} />;
    case 'image':
      return <ImageModule content={content} />;
    case 'stats':
      return <StatsModule content={content} />;
    case 'chart':
      return <ChartModule content={content} />;
    case 'clock':
      return <ClockModule content={content} />;
    case 'weather':
      return <WeatherModule content={content} />;
    case 'social':
      return <SocialModule content={content} />;
    case 'embed':
      return <EmbedModule content={content} />;
    case 'custom':
    default:
      return <CustomModule content={content} />;
  }
}
