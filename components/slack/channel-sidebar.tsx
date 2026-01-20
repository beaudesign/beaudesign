'use client';

import { Channel } from '@/lib/slack-types';
import { Hash, Plus, ChevronDown } from 'lucide-react';

interface ChannelSidebarProps {
  channels: Channel[];
  selectedChannelId: string;
  onSelectChannel: (channelId: string) => void;
}

export function ChannelSidebar({
  channels,
  selectedChannelId,
  onSelectChannel,
}: ChannelSidebarProps) {
  return (
    <div className="w-64 bg-gray-800 flex flex-col border-r border-gray-700">
      {/* Workspace Header */}
      <div className="p-4 border-b border-gray-700">
        <button className="w-full flex items-center justify-between text-white hover:bg-gray-700 px-2 py-1 rounded">
          <span className="font-bold text-lg">RL Workspace</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {/* Channels Section */}
          <div className="mb-4">
            <button className="w-full flex items-center justify-between text-gray-300 hover:text-white px-2 py-1 text-sm">
              <span className="flex items-center gap-1">
                <ChevronDown className="w-3 h-3" />
                <span className="font-semibold">Channels</span>
              </span>
              <Plus className="w-4 h-4" />
            </button>

            <div className="mt-1 space-y-0.5">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onSelectChannel(channel.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors ${
                    selectedChannelId === channel.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Hash className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate text-sm">{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div>
            <button className="w-full flex items-center justify-between text-gray-300 hover:text-white px-2 py-1 text-sm">
              <span className="flex items-center gap-1">
                <ChevronDown className="w-3 h-3" />
                <span className="font-semibold">Direct messages</span>
              </span>
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-semibold">
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">RL Agent</div>
            <div className="text-xs text-gray-400">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
