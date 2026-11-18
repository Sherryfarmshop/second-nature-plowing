'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Alex's assistant for Second Nature Snow Removal in Livonia, Michigan. You help homeowners and businesses get a snow removal quote.

BUSINESS INFO:
- Business: Second Nature Snow Removal
- Owner: Alex Sieber
- Phone: 734-756-6119
- Service area: Livonia, Westland, Farmington Hills, Canton, Plymouth, Northville, Garden City, Dearborn Heights, Redford, Novi
- Services: Residential driveway plowing, commercial lot plowing, salting/de-icing, sidewalk clearing
- Pricing: Free custom quotes based on property
- Contracts: Seasonal or per-push available
- Fully licensed and insured

YOUR JOB:
1. Answer questions about services, pricing, and service area
2. Collect quote information from interested customers
3. When collecting a quote, ask these questions ONE AT A TIME:
   - What is the address where you need snow removal?
   - Is this residential or commercial?
   - What needs clearing? (driveway / sidewalks / parking lot / all)
   - How large is the area? (1-car / 2-car / 3+ car / long driveway)
   - Any special conditions? (steep, gravel, tight turnaround, etc.)
   - Seasonal or one-time service?
   - Would you like salting/de-icing?
   - When would you like service to start?
   - Your name?
   - Best phone number?
   - Email address?
4. When you have all info, say: "QUOTE_COMPLETE: [summarize all answers]"

TONE: Friendly, professional, brief. This is a local family business. No fluff.

If asked about price, explain quotes are free and custom — text Alex at 734-756-6119 for fastest response.`;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm Alex's assistant at Second Nature Snow Removal. I can answer questions or help you get a free quote. What can I help you with?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          _replyto: 'llcsecondnature@gmail.com'
        })
      });
      setLeadSent(true);
    } catch (e) {
      console.error('Failed to send lead:', e);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();
      const assistantContent = data.content || "I'm sorry, I had trouble with that. Please call Alex at 734-756-6119.";

      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);

      // Check if quote is complete
      if (assistantContent.includes('QUOTE_COMPLETE:') && !leadSent) {
        await sendToFormspree(assistantContent.replace('QUOTE_COMPLETE:', 'New chatbot quote request:\n'));
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please call Alex directly at 734-756-6119." }]);
    }

    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000,
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#4A5D3A', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s'
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
        <div style={{
          position: 'fixed', bottom: '96px', right: '24px', zIndex: 1000,
          width: '360px', maxWidth: 'calc(100vw - 48px)',
          background: 'white', borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', maxHeight: '520px'
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
              <div key={i} style={{
                display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? '#4A5D3A' : '#F3F4F6',
                  color: msg.role === 'user' ? 'white' : '#1F2937',
                  fontSize: '14px', lineHeight: '1.5'
                }}>
                  {msg.content.replace('QUOTE_COMPLETE:', '').trim()}
                </div>
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
          <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              style={{
                flex: 1, padding: '10px 14px', border: '1px solid #E5E7EB',
                borderRadius: '24px', outline: 'none', fontSize: '14px',
                background: '#F9FAFB'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: '#4A5D3A', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: loading || !input.trim() ? 0.5 : 1
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

export { SYSTEM_PROMPT };
