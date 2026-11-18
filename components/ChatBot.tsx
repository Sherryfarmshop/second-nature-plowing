'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  buttons?: string[];
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm Alex's assistant at Second Nature Snow Removal. I can answer questions or help you get a free quote. Would you like a free snow removal quote, or do you have a question?",
      buttons: ['Get a Free Quote', 'Ask a Question']
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendToFormspree = async (summary: string) => {
    try {
      await fetch('https://formspree.io/f/mjywvowk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'New Snow Removal Quote Request (Chatbot)',
          message: summary,
        })
      });
      setLeadSent(true);
    } catch (e) {
      console.error('Failed to send lead:', e);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await response.json();
      const assistantContent: string = data.content || "I'm sorry, I had trouble with that. Please call Alex at 734-756-6119.";

      // Parse buttons from response if any
      let buttons: string[] | undefined;
      let displayContent = assistantContent;

      if (assistantContent.includes('BUTTONS:')) {
        const parts = assistantContent.split('BUTTONS:');
        displayContent = parts[0].trim();
        buttons = parts[1].trim().split('|').map(b => b.trim()).filter(Boolean);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: displayContent.replace('QUOTE_COMPLETE:', '').trim(),
        buttons
      }]);

      if (assistantContent.includes('QUOTE_COMPLETE:') && !leadSent) {
        await sendToFormspree('New chatbot quote request:\n' + assistantContent.replace('QUOTE_COMPLETE:', '').trim());
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, something went wrong. Please call Alex at 734-756-6119."
      }]);
    }

    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000,
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#4A5D3A', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="Chat with us"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <>
          <style>{`
            .chatbot-window {
              bottom: 96px !important;
              right: 24px !important;
              width: 380px !important;
              max-width: calc(100vw - 48px) !important;
              border-radius: 16px !important;
              box-shadow: 0 8px 40px rgba(0,0,0,0.18) !important;
              height: min(560px, calc(100dvh - 140px)) !important;
              max-height: min(560px, calc(100dvh - 140px)) !important;
              left: auto !important;
            }
            @media (max-width: 639px) {
              .chatbot-window {
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 20px 20px 0 0 !important;
                box-shadow: 0 -4px 30px rgba(0,0,0,0.2) !important;
                height: 78svh !important;
                max-height: 78svh !important;
              }
            }
          `}</style>
          <div style={isMobile ? {
            position: "fixed", zIndex: 1000, background: "white", display: "flex", flexDirection: "column", overflow: "hidden",
            bottom: 0, left: 0, right: 0, width: "100%", borderRadius: "20px 20px 0 0",
            boxShadow: "0 -4px 30px rgba(0,0,0,0.2)", height: "78svh", maxHeight: "78svh"
          } : {
            position: "fixed", zIndex: 1000, background: "white", display: "flex", flexDirection: "column", overflow: "hidden",
            bottom: "96px", right: "24px", left: "auto", width: "380px", maxWidth: "calc(100vw - 48px)",
            borderRadius: "16px", boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            height: "min(560px, calc(100dvh - 140px))", maxHeight: "min(560px, calc(100dvh - 140px))"
          }}>
          {/* Header */}
          <div style={{ background: '#4A5D3A', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E8C547', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>❄️</div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>Second Nature Snow Removal</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>Ask me anything · Get a free quote</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? '#4A5D3A' : '#F3F4F6',
                    color: msg.role === 'user' ? 'white' : '#1F2937',
                    fontSize: '14px', lineHeight: '1.5'
                  }}>
                    {msg.content}
                  </div>
                </div>
                {/* Buttons */}
                {msg.buttons && msg.buttons.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', paddingLeft: '4px' }}>
                    {msg.buttons.map((btn, bi) => (
                      <button
                        key={bi}
                        onClick={() => sendMessage(btn)}
                        style={{
                          padding: '8px 16px', borderRadius: '20px',
                          border: '2px solid #4A5D3A', background: 'white',
                          color: '#4A5D3A', fontSize: '13px', fontWeight: 600,
                          cursor: 'pointer', transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#4A5D3A'; (e.target as HTMLButtonElement).style.color = 'white'; }}
                        onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'white'; (e.target as HTMLButtonElement).style.color = '#4A5D3A'; }}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: '#F3F4F6', fontSize: '14px', color: '#9CA3AF' }}>
                  Typing...
                </div>
              </div>
            )}
            {leadSent && (
              <div style={{ textAlign: 'center', padding: '8px', background: '#D1FAE5', borderRadius: '8px', fontSize: '13px', color: '#065F46' }}>
                ✅ Quote request sent to Alex!
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px', alignItems: 'center', background: 'white' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              style={{
                flex: 1, padding: '10px 14px', border: '1.5px solid #D1D5DB',
                borderRadius: '24px', outline: 'none', fontSize: '16px',
                background: 'white', color: '#111', minWidth: 0,
                WebkitAppearance: 'none'
              }}
              onFocus={() => setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 400)}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: input.trim() ? '#4A5D3A' : '#9CA3AF', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}






