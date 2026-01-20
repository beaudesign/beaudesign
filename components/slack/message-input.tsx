'use client';

import { useState, KeyboardEvent } from 'react';
import { Send, Paperclip, Smile, AtSign } from 'lucide-react';

interface MessageInputProps {
  channelName: string;
  onSendMessage: (content: string) => void;
}

export function MessageInput({ channelName, onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gray-900 border-t border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channelName}`}
            className="w-full bg-transparent text-white px-4 pt-3 pb-2 resize-none outline-none placeholder-gray-500"
            rows={3}
          />

          <div className="flex items-center justify-between px-3 pb-2">
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Add emoji"
              >
                <Smile className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Mention someone"
              >
                <AtSign className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded transition-colors text-sm font-medium"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          <span className="font-semibold">Enter</span> to send, <span className="font-semibold">Shift + Enter</span> for new line
        </div>
      </div>
    </div>
  );
}
