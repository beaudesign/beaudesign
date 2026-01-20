# Design Trials

A collection of design prototypes and RL training environments.

## Projects

### 1. Relay - Interactive AI Product
Relay is an interactive AI product similar to Claude Imagine, featuring a modular homepage and universal chat window.

### 2. Slack Replica - RL Training Environment
A functional Slack clone designed as a training environment for Reinforcement Learning agents. This prototype simulates workplace collaboration software to help AI agents learn software interaction patterns. See [SLACK_RL_ENV.md](SLACK_RL_ENV.md) for detailed documentation.

## Features

### Relay Features
- **Modular Homepage**: A beautiful, card-based interface where widgets and chats are recorded
- **Universal Chat Window**: An interactive chat interface accessible through the sidebar
- **Sidebar Navigation**: Easy navigation between home and chat views with recent chat history
- **Modern Design System**: Built with Carbon Design System principles

### Slack Replica Features
- **Channel Navigation**: Switch between multiple workspace channels
- **Real-time Messaging**: Send and receive messages with timestamp tracking
- **User Interface**: Professional Slack-like dark theme
- **RL Training Ready**: Designed for AI agent training with clear action spaces

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: ShadCN UI components
- **AI Integration**: [Vercel AI SDK](https://ai-sdk.dev)
- **Design System**: [IBM Carbon Design System](https://carbondesignsystem.com)
  - IBM Plex Sans & IBM Plex Mono fonts
  - Carbon color tokens
  - Carbon spacing scale
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Routes

- `/` - Relay homepage
- `/slack` - Slack replica RL training environment
- `/interpretability` - Interpretability visualization tool

## Project Structure

```
/app
  page.tsx                # Relay homepage
  layout.tsx              # Root layout with IBM Plex fonts
  globals.css             # Global styles with Carbon Design tokens
  /slack
    page.tsx              # Slack replica main page
  /interpretability
    page.tsx              # Interpretability tool
/components
  relay-layout.tsx        # Main layout component
  modular-homepage.tsx    # Homepage with action cards
  chat-window.tsx         # Universal chat window
  sidebar.tsx             # Navigation sidebar
  /slack                  # Slack replica components
    channel-sidebar.tsx   # Channel list and navigation
    message-list.tsx      # Message display
    message-input.tsx     # Message composition
  /ui                     # ShadCN UI components
    button.tsx
    input.tsx
    card.tsx
/lib
  utils.ts                # Utility functions
  slack-types.ts          # TypeScript types for Slack
```

## Design Tokens

The project uses Carbon Design System tokens:

- **Colors**: Blue palette (blue-10 to blue-80), Gray palette (gray-10 to gray-100)
- **Spacing**: Carbon spacing scale (spacing-01 to spacing-13)
- **Typography**: IBM Plex Sans (300, 400, 500, 600, 700) and IBM Plex Mono

## Next Steps

- Integrate AI SDK with actual chat API
- Add authentication
- Implement chat persistence
- Add more widget types for the modular homepage
- Enhance sidebar with chat management features

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://ai-sdk.dev/docs/introduction)
- [Carbon Design System](https://carbondesignsystem.com)
- [ShadCN UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
