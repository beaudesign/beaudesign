export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  reactions?: Reaction[];
}

export interface Reaction {
  emoji: string;
  userIds: string[];
  count: number;
}
