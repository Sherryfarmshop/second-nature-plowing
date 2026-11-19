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

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [messages, open]);

  const sendToFormspree = async (summary: string) => {
    try {
      await fetch('https://formspree.io/f/mjywvowk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: 'New Snow Removal Quote Request (Chatbot)', message: summary })
      });
      setLeadSent(true);
    } catch (e) { console.error(e); }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage: Message = { role: 'user', content: text };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await response.json();
      const raw: string = data.content || "Sorry, something went wrong. Please try again.";
      let buttons: string[] | undefined;
      let display = raw;
      if (raw.includes('BUTTONS:')) {
        const parts = raw.split('BUTTONS:');
        display = parts[0].trim();
        buttons = parts[1].trim().split('|').map(b => b.trim()).filter(Boolean);
      }
      setMessages(prev => [...prev, { role: 'assistant', content: display.replace('QUOTE_COMPLETE:', '').trim(), buttons }]);
      if (raw.includes('QUOTE_COMPLETE:') && !leadSent) {
        await sendToFormspree('New chatbot quote:\n' + raw.replace('QUOTE_COMPLETE:', '').trim());
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <>
      {/* ── Floating bubble ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
          width: 60, height: 60, borderRadius: '50%',
          background: '#4A5D3A', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        }
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 90,
          right: 16,
          zIndex: 9998,
          width: 'min(360px, calc(100vw - 32px))',
          height: 'min(520px, calc(100vh - 110px))',
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{ background: '#4A5D3A', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E8C547', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>❄️</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Second Nature Snow Removal</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>Ask anything · Free quote</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 4px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '82%', padding: '9px 13px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? '#4A5D3A' : '#F3F4F6',
                    color: msg.role === 'user' ? '#fff' : '#1F2937',
                    fontSize: 14, lineHeight: 1.5,
                  }}>{msg.content}</div>
                </div>
                {msg.buttons && msg.buttons.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, paddingLeft: 2 }}>
                    {msg.buttons.map((btn, bi) => (
                      <button key={bi} onClick={() => sendMessage(btn)} style={{
                        padding: '10px 16px', borderRadius: 24,
                        border: '2px solid #4A5D3A', background: '#fff',
                        color: '#4A5D3A', fontSize: 14, fontWeight: 600,
                        cursor: 'pointer', textAlign: 'left',
                      }}>{btn}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '9px 13px', borderRadius: '16px 16px 16px 4px', background: '#F3F4F6', fontSize: 14, color: '#9CA3AF' }}>Typing…</div>
              </div>
            )}
            {leadSent && (
              <div style={{ textAlign: 'center', padding: 8, background: '#D1FAE5', borderRadius: 8, fontSize: 13, color: '#065F46' }}>✅ Sent to Alex!</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 8, background: '#fff', flexShrink: 0 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your answer here…"
              autoComplete="off"
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #4A5D3A',
                borderRadius: 24,
                outline: 'none',
                fontSize: 16,
                background: '#fff',
                color: '#111',
                minWidth: 0,
                width: '100%',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: '50%',
                background: input.trim() && !loading ? '#4A5D3A' : '#9CA3AF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
