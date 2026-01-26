'use client';

import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets } from 'lucide-react';
import { ModuleContent } from '@/lib/grid-types';

interface WeatherModuleProps {
  content: ModuleContent;
}

// Mock weather data
const mockWeather = {
  temp: 22,
  condition: 'Partly Cloudy',
  high: 25,
  low: 18,
  humidity: 65,
  wind: 12,
  forecast: [
    { day: 'Mon', icon: 'sun', temp: 24 },
    { day: 'Tue', icon: 'cloud', temp: 21 },
    { day: 'Wed', icon: 'rain', temp: 19 },
    { day: 'Thu', icon: 'sun', temp: 23 },
    { day: 'Fri', icon: 'cloud', temp: 22 },
  ],
};

const getWeatherIcon = (icon: string, className: string) => {
  switch (icon) {
    case 'sun':
      return <Sun className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'rain':
      return <CloudRain className={className} />;
    case 'snow':
      return <CloudSnow className={className} />;
    default:
      return <Sun className={className} />;
  }
};

export function WeatherModule({ content }: WeatherModuleProps) {
  const { title = 'San Francisco' } = content;
  const weather = mockWeather;

  return (
    <div className="w-full h-full p-5 flex flex-col">
      {/* Current weather */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-neutral-400 mb-1"
          >
            {title}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-4xl font-light text-white">{weather.temp}</span>
            <span className="text-xl text-neutral-400">°C</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-neutral-500 mt-1"
          >
            {weather.condition}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sun className="w-12 h-12 text-amber-400" />
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 mb-4 text-sm"
      >
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Droplets className="w-4 h-4" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Wind className="w-4 h-4" />
          <span>{weather.wind} km/h</span>
        </div>
        <div className="text-neutral-400">
          H:{weather.high}° L:{weather.low}°
        </div>
      </motion.div>

      {/* Forecast */}
      <div className="flex-1 pt-4 border-t border-white/5">
        <div className="grid grid-cols-5 gap-2 h-full">
          {weather.forecast.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex flex-col items-center justify-center gap-1"
            >
              <span className="text-xs text-neutral-500">{day.day}</span>
              {getWeatherIcon(day.icon, 'w-5 h-5 text-neutral-400')}
              <span className="text-sm text-white">{day.temp}°</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
