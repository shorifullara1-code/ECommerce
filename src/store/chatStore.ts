import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isAdmin: boolean;
}

export interface ChatSession {
  id: string;
  customerId: string;
  customerName: string;
  messages: ChatMessage[];
  unreadAdmin: number;
  unreadCustomer: number;
  lastMessageAt: string;
}

interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  sendMessage: (sessionId: string, text: string, senderId: string, senderName: string, isAdmin: boolean) => void;
  createSession: (customerId: string, customerName: string) => string;
  setActiveSession: (sessionId: string) => void;
  markAsReadAdmin: (sessionId: string) => void;
  markAsReadCustomer: (sessionId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [
    {
      id: 'SESSION-1',
      customerId: 'CUST-1',
      customerName: 'Guest User',
      messages: [
        {
          id: 'MSG-1',
          senderId: 'ADMIN-1',
          senderName: 'Support Agent',
          text: 'Hello! How can we help you today?',
          timestamp: new Date().toISOString(),
          isAdmin: true,
        }
      ],
      unreadAdmin: 0,
      unreadCustomer: 1,
      lastMessageAt: new Date().toISOString()
    }
  ],
  activeSessionId: null,

  sendMessage: (sessionId, text, senderId, senderName, isAdmin) => set((state) => {
    const newMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      senderId,
      senderName,
      text,
      timestamp: new Date().toISOString(),
      isAdmin
    };

    return {
      sessions: state.sessions.map(s => {
        if (s.id === sessionId) {
          return {
            ...s,
            messages: [...s.messages, newMsg],
            unreadAdmin: isAdmin ? s.unreadAdmin : s.unreadAdmin + 1,
            unreadCustomer: !isAdmin ? s.unreadCustomer : s.unreadCustomer + 1,
            lastMessageAt: newMsg.timestamp
          };
        }
        return s;
      })
    };
  }),

  createSession: (customerId, customerName) => {
    const id = `SESSION-${Date.now()}`;
    set((state) => ({
      sessions: [...state.sessions, {
        id,
        customerId,
        customerName,
        messages: [{
          id: `MSG-INIT-${Date.now()}`,
          senderId: 'ADMIN-1',
          senderName: 'Support Agent',
          text: 'Hello! Welcome to Ghorer Bazar. How can I assist you?',
          timestamp: new Date().toISOString(),
          isAdmin: true,
        }],
        unreadAdmin: 0,
        unreadCustomer: 1,
        lastMessageAt: new Date().toISOString()
      }]
    }));
    return id;
  },

  setActiveSession: (sessionId) => set({ activeSessionId: sessionId }),

  markAsReadAdmin: (sessionId) => set((state) => ({
    sessions: state.sessions.map(s => s.id === sessionId ? { ...s, unreadAdmin: 0 } : s)
  })),

  markAsReadCustomer: (sessionId) => set((state) => ({
    sessions: state.sessions.map(s => s.id === sessionId ? { ...s, unreadCustomer: 0 } : s)
  })),
}));
