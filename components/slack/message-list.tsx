'use client';

import { Message } from '@/lib/slack-types';
import { useEffect, useRef } from 'react';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: messageDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  let lastDate: string | null = null;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const messageDate = formatDate(message.timestamp);
            const showDateSeparator = messageDate !== lastDate;
            lastDate = messageDate;

            return (
              <div key={message.id}>
                {showDateSeparator && (
                  <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 h-px bg-gray-700" />
                    <span className="text-xs font-semibold text-gray-400 px-2">
                      {messageDate}
                    </span>
                    <div className="flex-1 h-px bg-gray-700" />
                  </div>
                )}

                <div className="flex gap-3 hover:bg-gray-800 px-4 py-2 rounded group">
                  <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0 text-xl">
                    {message.userAvatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-white">
                        {message.userName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    <div className="text-gray-200 text-sm mt-0.5 break-words">
                      {message.content}
                    </div>

                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {message.reactions.map((reaction, idx) => (
                          <button
                            key={idx}
                            className="flex items-center gap-1 px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded-full text-xs"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-gray-300">{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
