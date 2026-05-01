import React, { useEffect, useRef, useState } from 'react';
import { Send, User, Search, Store, ArrowLeft } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

export default function LiveChat() {
  const { sessions, activeSessionId, setActiveSession, sendMessage, markAsReadAdmin } = useChatStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  useEffect(() => {
    if (activeSessionId) {
      markAsReadAdmin(activeSessionId);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSessionId, activeSession?.messages.length, markAsReadAdmin]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeSessionId) return;
    
    sendMessage(activeSessionId, inputText, 'ADMIN-1', 'Support Agent', true);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col bg-gray-50 shrink-0 ${activeSession ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-bold text-gray-900 mb-3">Live Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#F37A20]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {sessions.map(session => (
            <button
              key={session.id}
              onClick={() => setActiveSession(session.id)}
              className={`w-full text-left p-4 border-b border-gray-100 focus:outline-none transition-colors ${
                activeSessionId === session.id ? 'bg-orange-50 border-[#F37A20]/20' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className="font-medium text-gray-900 text-sm truncate pr-2">{session.customerName}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                  {new Date(session.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 truncate pr-2">
                  {session.messages[session.messages.length - 1]?.text || 'No messages'}
                </p>
                {session.unreadAdmin > 0 && (
                  <span className="w-5 h-5 bg-[#F37A20] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {session.unreadAdmin}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-white min-w-0 ${!activeSession ? 'hidden md:flex' : 'flex'}`}>
        {activeSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setActiveSession('')}
                className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{activeSession.customerName}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Online now
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              {activeSession.messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[70%] ${!msg.isAdmin ? 'self-start' : 'self-end'}`}
                >
                  <div className="text-xs text-gray-400 mb-1 px-1 flex items-center gap-2">
                    {msg.senderName}
                    <span>•</span>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${
                    !msg.isAdmin 
                      ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm' 
                      : 'bg-[#F37A20] text-white rounded-tr-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message to customer..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-12 h-12 bg-[#F37A20] text-white rounded-xl flex items-center justify-center disabled:opacity-50 hover:bg-[#d96a18] transition-colors shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
            <Store className="w-16 h-16 text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Live Support Hub</h3>
            <p className="text-center max-w-sm">Select a conversation from the sidebar to start chatting with customers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
