import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { sessions, createSession, sendMessage, markAsReadCustomer } = useChatStore();
  
  const currentSession = sessions.find(s => s.id === sessionId);

  useEffect(() => {
    if (isOpen && currentSession) {
      markAsReadCustomer(currentSession.id);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, currentSession?.messages.length, currentSession?.id, markAsReadCustomer]);

  const handleOpen = () => {
    if (!sessionId) {
      const newSessionId = createSession('GUEST-' + Date.now(), 'Guest Customer');
      setSessionId(newSessionId);
    }
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionId) return;
    
    sendMessage(sessionId, inputText, 'GUEST', 'Guest Customer', false);
    setInputText('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={handleOpen}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#F37A20] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#d96a18] transition-transform hover:scale-105 z-50"
      >
        <MessageSquare className="w-6 h-6" />
        {/* Mock unread badge if there were a logged in user with active session, 
            but for guest we just show when they open */}
      </button>
    );
  }

  return (
    <div className={`fixed right-6 z-50 flex flex-col bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
      isMinimized ? 'bottom-6 w-72 h-16' : 'bottom-6 w-[350px] h-[500px]'
    }`}>
      {/* Header */}
      <div className="bg-[#F37A20] p-4 flex items-center justify-between text-white shrink-0 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Live Support</h3>
            {!isMinimized && <p className="text-xs text-white/80">We typically reply in minutes</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {currentSession?.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[80%] ${msg.isAdmin ? 'self-start' : 'self-end'}`}
              >
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.isAdmin 
                    ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm' 
                    : 'bg-[#F37A20] text-white rounded-tr-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 bg-[#F37A20] text-white rounded-xl flex items-center justify-center disabled:opacity-50 hover:bg-[#d96a18] transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
