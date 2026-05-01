import { create } from 'zustand';
import { supabase } from '../lib/supabase';

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
  initialized: boolean;
  initializeSupabaseChat: () => Promise<void>;
  sendMessage: (sessionId: string, text: string, senderId: string, senderName: string, isAdmin: boolean) => Promise<void>;
  createSession: (customerId: string, customerName: string) => Promise<string>;
  setActiveSession: (sessionId: string) => void;
  markAsReadAdmin: (sessionId: string) => Promise<void>;
  markAsReadCustomer: (sessionId: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [],
  activeSessionId: null,
  initialized: false,

  initializeSupabaseChat: async () => {
    if (get().initialized) return;

    try {
      // 1. Fetch initial sessions
      const { data: initialSessions, error: sessionsError } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('last_message_at', { ascending: false });

      if (sessionsError) {
        console.error('Error fetching sessions:', sessionsError);
        return; // fallback to empty
      }

      // 2. Fetch initial messages
      const { data: initialMessages, error: messagesError } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
      }

      // Transform DB records into state objects
      const formattedSessions: ChatSession[] = (initialSessions || []).map(s => ({
        id: s.id,
        customerId: s.customer_id,
        customerName: s.customer_name,
        unreadAdmin: s.unread_admin || 0,
        unreadCustomer: s.unread_customer || 0,
        lastMessageAt: s.last_message_at,
        messages: (initialMessages || [])
          .filter(m => m.session_id === s.id)
          .map(m => ({
            id: m.id,
            senderId: m.sender_id,
            senderName: m.sender_name,
            text: m.text,
            isAdmin: m.is_admin,
            timestamp: m.created_at,
          }))
      }));

      set({ sessions: formattedSessions, initialized: true });

      // 3. Set up Realtime subscriptions
      supabase.channel('public:chat_sessions')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_sessions' }, payload => {
            if (payload.eventType === 'INSERT') {
              const s = payload.new;
              set(state => {
                 if (state.sessions.find(x => x.id === s.id)) return state;
                 return {
                    sessions: [{
                      id: s.id,
                      customerId: s.customer_id,
                      customerName: s.customer_name,
                      unreadAdmin: s.unread_admin || 0,
                      unreadCustomer: s.unread_customer || 0,
                      lastMessageAt: s.last_message_at,
                      messages: []
                    }, ...state.sessions]
                 };
              });
            } else if (payload.eventType === 'UPDATE') {
              const s = payload.new;
              set(state => ({
                sessions: state.sessions.map(sess => 
                  sess.id === s.id ? { 
                    ...sess, 
                    unreadAdmin: s.unread_admin, 
                    unreadCustomer: s.unread_customer,
                    lastMessageAt: s.last_message_at
                  } : sess
                ).sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
              }));
            }
        })
        .subscribe();

      supabase.channel('public:chat_messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, payload => {
           const m = payload.new;
           set(state => ({
              sessions: state.sessions.map(sess => {
                 if (sess.id === m.session_id) {
                    if (sess.messages.find(msg => msg.id === m.id)) return sess;
                    return {
                       ...sess,
                       messages: [...sess.messages, {
                          id: m.id,
                          senderId: m.sender_id,
                          senderName: m.sender_name,
                          text: m.text,
                          isAdmin: m.is_admin,
                          timestamp: m.created_at,
                       }]
                    };
                 }
                 return sess;
              })
           }));
        })
        .subscribe();
    } catch (e) {
      console.warn("Couldn't connect to Supabase for chats", e);
    }
  },

  sendMessage: async (sessionId, text, senderId, senderName, isAdmin) => {
    // 1. Insert message
    const { error: msgError } = await supabase
       .from('chat_messages')
       .insert({
          session_id: sessionId,
          sender_id: senderId,
          sender_name: senderName,
          text: text,
          is_admin: isAdmin
       });

    if (msgError) {
       console.error("Error sending user message:", msgError);
       return;
    }

    // 2. Fetch session to get current unread counts
    const session = get().sessions.find(s => s.id === sessionId);
    if (!session) return;

    // 3. Update session
    await supabase.from('chat_sessions').update({
       last_message_at: new Date().toISOString(),
       unread_admin: isAdmin ? session.unreadAdmin : session.unreadAdmin + 1,
       unread_customer: !isAdmin ? session.unreadCustomer : session.unreadCustomer + 1,
    }).eq('id', sessionId);
  },

  createSession: async (customerId, customerName) => {
    const { data: sessionData, error: sessionError } = await supabase
       .from('chat_sessions')
       .insert({
          customer_id: customerId,
          customer_name: customerName,
          unread_admin: 0,
          unread_customer: 1, // Will have 1 admin msg initially
       })
       .select()
       .single();
    
    if (sessionError) {
       console.error("Error creating session:", sessionError);
       return "";
    }

    // Give it a generic admin start message
    await supabase.from('chat_messages').insert({
       session_id: sessionData.id,
       sender_id: 'ADMIN-1',
       sender_name: 'Support Agent',
       text: 'Hello! Welcome to Ghorer Bazar. How can I assist you?',
       is_admin: true
    });

    return sessionData.id;
  },

  setActiveSession: (sessionId) => set({ activeSessionId: sessionId }),

  markAsReadAdmin: async (sessionId) => {
    await supabase.from('chat_sessions').update({ unread_admin: 0 }).eq('id', sessionId);
  },

  markAsReadCustomer: async (sessionId) => {
    await supabase.from('chat_sessions').update({ unread_customer: 0 }).eq('id', sessionId);
  },
}));
