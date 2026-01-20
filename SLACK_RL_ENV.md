# Slack Replica - RL Training Environment

A functional Slack replica built as a training environment for Reinforcement Learning agents, inspired by Deeptune's approach to creating comprehensive software simulation gyms.

## Overview

This Slack replica provides a realistic environment for training AI agents on common workplace collaboration tasks. The environment simulates core Slack functionality including channels, messaging, and real-time communication patterns.

## Features

### Core Functionality
- **Channel Navigation**: Switch between multiple channels (general, random, ai-research, rl-environments)
- **Message Display**: View conversation history with timestamps and user avatars
- **Message Sending**: Send new messages to channels
- **Real-time UI**: Auto-scroll to new messages, date separators, and formatted timestamps
- **User Interface**: Professional Slack-like dark theme with responsive design

### RL Training Use Cases

This environment enables AI agents to practice:

1. **Navigation Tasks**
   - Switch between different channels
   - Locate specific conversations
   - Understand workspace structure

2. **Communication Tasks**
   - Send messages in appropriate channels
   - Read and comprehend message history
   - Understand conversation context

3. **UI Interaction**
   - Click buttons and interact with UI elements
   - Type and submit text
   - Navigate sidebar menus

4. **Context Understanding**
   - Determine which channel is appropriate for a message
   - Read timestamps and understand conversation flow
   - Identify users and their roles

## Architecture

### Technology Stack
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState)

### Project Structure

```
/app/slack/page.tsx          # Main Slack replica page
/components/slack/
  ├── channel-sidebar.tsx    # Channel list and workspace navigation
  ├── message-list.tsx       # Message display with date separators
  └── message-input.tsx      # Message composition and sending
/lib/slack-types.ts          # TypeScript interfaces for Slack entities
```

### Data Models

```typescript
interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Channel {
  id: string;
  name: string;
  description?: string;
}

interface Message {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  reactions?: Reaction[];
}
```

## Running the Environment

### Development Mode
```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000/slack` to access the Slack replica.

### Production Build
```bash
npm run build
npm start
```

## RL Integration Points

### Actions
The environment supports the following agent actions:
- `selectChannel(channelId: string)`: Switch to a different channel
- `sendMessage(content: string)`: Send a message to the current channel
- `readMessages()`: Get current channel messages

### Observations
Agents can observe:
- Current channel ID and name
- Available channels list
- Message history in current channel
- Current user information

### Reward Signals
Potential reward signals for RL training:
- Successfully sending a message
- Selecting the correct channel for a task
- Responding to messages in context
- Completing multi-step communication tasks

## Extension Opportunities

Future enhancements for more complex RL training:

1. **Direct Messages**: Add 1-on-1 conversations
2. **Threads**: Enable threaded replies to messages
3. **Reactions**: Add emoji reactions to messages
4. **File Sharing**: Upload and share files
5. **Search**: Implement message search functionality
6. **User Status**: Online/offline indicators
7. **Notifications**: Unread message badges
8. **@Mentions**: Tag and notify specific users
9. **Channel Management**: Create/delete channels
10. **Workspace Settings**: Customize workspace preferences

## Benefits for RL Research

This environment provides:

1. **Realistic Complexity**: Mirrors actual software UI patterns
2. **Clear Action Space**: Well-defined set of possible actions
3. **Observable State**: All relevant information is accessible
4. **Scalable Difficulty**: Can add features to increase complexity
5. **Transferable Skills**: Skills learned apply to real Slack usage

## Comparison to Real Slack

### Similarities
- Visual design and layout
- Core messaging functionality
- Channel-based organization
- User profiles and avatars

### Simplifications
- No backend/database (client-side state only)
- No authentication system
- No real-time websocket connections
- Limited to predefined users and channels
- No advanced features (threads, search, integrations)

These simplifications make it ideal for RL training by reducing unnecessary complexity while maintaining the essential interaction patterns.

## License

This is a prototype training environment for educational and research purposes.
