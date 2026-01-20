'use client';

import { useState } from 'react';
import { ChannelSidebar } from '@/components/slack/channel-sidebar';
import { MessageList } from '@/components/slack/message-list';
import { MessageInput } from '@/components/slack/message-input';
import { Channel, Message, User } from '@/lib/slack-types';

const initialUser: User = {
  id: '1',
  name: 'RL Agent',
  avatar: '🤖',
};

const initialChannels: Channel[] = [
  { id: '1', name: 'general', description: 'General discussion' },
  { id: '2', name: 'random', description: 'Random conversations' },
  { id: '3', name: 'ai-research', description: 'AI research topics' },
  { id: '4', name: 'rl-environments', description: 'RL environment development' },
];

const initialMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      channelId: '1',
      userId: '2',
      userName: 'Team Lead',
      userAvatar: '👨‍💼',
      content: 'Welcome to the general channel!',
      timestamp: new Date('2024-01-20T09:00:00'),
    },
    {
      id: '2',
      channelId: '1',
      userId: '3',
      userName: 'Developer',
      userAvatar: '👩‍💻',
      content: 'Good morning everyone! Ready to start the day.',
      timestamp: new Date('2024-01-20T09:15:00'),
    },
  ],
  '2': [
    {
      id: '3',
      channelId: '2',
      userId: '3',
      userName: 'Developer',
      userAvatar: '👩‍💻',
      content: 'Anyone tried the new coffee machine?',
      timestamp: new Date('2024-01-20T10:00:00'),
    },
  ],
  '3': [
    {
      id: '4',
      channelId: '3',
      userId: '4',
      userName: 'Researcher',
      userAvatar: '🔬',
      content: 'Check out this new paper on transformer architectures!',
      timestamp: new Date('2024-01-20T11:00:00'),
    },
  ],
  '4': [
    {
      id: '5',
      channelId: '4',
      userId: '2',
      userName: 'Team Lead',
      userAvatar: '👨‍💼',
      content: 'We need to create more training environments for our RL agents.',
      timestamp: new Date('2024-01-20T13:00:00'),
    },
  ],
};

export default function SlackReplicaPage() {
  const [channels] = useState<Channel[]>(initialChannels);
  const [selectedChannelId, setSelectedChannelId] = useState<string>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [user] = useState<User>(initialUser);

  const selectedChannel = channels.find(c => c.id === selectedChannelId);
  const channelMessages = messages[selectedChannelId] || [];

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !selectedChannel) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      channelId: selectedChannelId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => ({
      ...prev,
      [selectedChannelId]: [...(prev[selectedChannelId] || []), newMessage],
    }));
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Channel Sidebar */}
      <ChannelSidebar
        channels={channels}
        selectedChannelId={selectedChannelId}
        onSelectChannel={setSelectedChannelId}
      />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Channel Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <h1 className="text-xl font-bold text-white">
            # {selectedChannel?.name}
          </h1>
          {selectedChannel?.description && (
            <p className="text-sm text-gray-400 mt-1">
              {selectedChannel.description}
            </p>
          )}
        </div>

        {/* Messages */}
        <MessageList messages={channelMessages} />

        {/* Message Input */}
        <MessageInput
          channelName={selectedChannel?.name || ''}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
