'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}%0AService: ${form.service}`;
    window.location.href = `mailto:llcsecondnature@gmail.com?subject=Snow Removal Quote Request from ${form.name}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* HERO SECTION - full background */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d1f0f 0%, #1a3a1f 40%, #1a3a1f 70%, #0d2010 100%)' }}>

        {/* Background plow truck image placeholder */}
        <div className="absolute inset-0">
          <Image
            src="/plow-truck.jpg"
            alt="Snow plow truck clearing a snowy road"
            fill
            className="object-cover object-right"
            priority
          />
        </div>

        {/* Light overlay on left side only for text readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,31,15,0.4) 0%, rgba(13,31,15,0.1) 45%, rgba(13,31,15,0.0) 100%)' }} />

        {/* NAVBAR */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <svg width="20" height="30" viewBox="0 0 20 30" fill="#E8C547">
                <path d="M10 0L0 12h4L0 22h7v8h6v-8h7L16 12h4z"/>
              </svg>
              <svg width="20" height="30" viewBox="0 0 20 30" fill="#c9a830">
                <path d="M10 0L0 12h4L0 22h7v8h6v-8h7L16 12h4z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'white', lineHeight: 1.1, letterSpacing: '0.05em' }}>SECOND<br />NATURE</div>
              <div style={{ fontSize: '0.8rem', color: 'white', letterSpacing: '0.15em', fontWeight: 700 }}>SNOW REMOVAL</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" style={{ background: "#063F32", color: "white", fontSize: "0.9rem", textDecoration: "none", fontWeight: 600, padding: "10px 22px", borderRadius: "999px" }}>Home</a>
            <a href="#quote" style={{ background: "#063F32", color: "white", fontSize: "0.9rem", textDecoration: "none", fontWeight: 600, padding: "10px 22px", borderRadius: "999px" }}>Snow Removal</a>
            <a href="#quote" style={{ background: '#E8C547', color: '#063F32', padding: '10px 24px', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>Get a Quote</a>
          </div>
        </nav>

        {/* Hero text */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 pt-10 pb-32">
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: '1rem', textTransform: 'uppercase' }}>
            SNOW DAYS<br />
            SHOULD BE{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              FUN.
              <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%' }} height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 4 Q25 0 50 4 Q75 8 100 4" stroke="#E8C547" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#e8f5d0', fontStyle: 'italic', marginBottom: '2rem', fontWeight: 400, lineHeight: 1.4 }}>
            We&apos;ll handle the driveway,<br />so you can enjoy what matters most.
          </p>
          <a href="#quote" style={{ display: 'inline-block', background: '#E8C547', color: '#063F32', padding: '18px 40px', borderRadius: '999px', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', letterSpacing: '0.05em' }}>
            GET A FREE QUOTE →
          </a>
        </div>

        {/* Wavy snow divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,10 1200,40 C1300,55 1380,30 1440,40 L1440,80 L0,80 Z" fill="#1a3a1f"/>
          </svg>
        </div>
      </section>

      {/* BOTTOM SECTION - cream/dark green */}
      <section id="quote" style={{ background: '#1a3a1f', padding: '0 0 60px 0' }}>
        {/* Trust bar */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="max-w-5xl mx-auto px-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {/* Residential */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 16px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Residential</div>
                <div style={{ color: 'white', fontSize: '0.85rem', opacity: 0.8 }}>Snow Removal</div>
              </div>
            </div>
            {/* Reliable */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 16px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Reliable</div>
                <div style={{ color: 'white', fontSize: '0.85rem', opacity: 0.8 }}>&amp; On Time</div>
              </div>
            </div>
            {/* Service Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 16px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Livonia &amp;</div>
                <div style={{ color: 'white', fontSize: '0.85rem', opacity: 0.8 }}>Surrounding Areas</div>
              </div>
            </div>
            {/* Local */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 16px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Local,</div>
                <div style={{ color: 'white', fontSize: '0.85rem', opacity: 0.8 }}>Trusted Service</div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Banner */}
        <div style={{ background: '#F5F1E8', padding: '18px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ color: '#063F32', fontWeight: 700, fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', marginBottom: '6px', lineHeight: 1.3 }}>
              Residential Snow Removal in Livonia, Michigan
            </h2>
            <p style={{ color: '#063F32', fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)', lineHeight: 1.6, margin: 0 }}>
              Second Nature provides reliable residential snow plowing in Livonia and surrounding communities. Let us handle the snow so you can spend less time shoveling and more time enjoying winter.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center" style={{ paddingTop: '40px' }}>
          {/* Left - Video - same height as form, centered, 9:16 natural ratio */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '9/16', maxHeight: '520px', width: 'auto' }}>
              <video
                src="https://cdn.creatify.ai/video-composer/67fca942-9016-459b-b57b-67f209d591b3.mp4"
                controls
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Right - Quote form */}
          <div>
            <h2 style={{ color: 'white', fontWeight: 800, fontSize: '1.8rem', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Request Your<br />Snow Removal Quote
            </h2>

            {submitted ? (
              <div style={{ background: '#c5e620', borderRadius: '12px', padding: '30px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</div>
                <p style={{ fontWeight: 700, color: '#0d1f0f' }}>Request sent! Alex will follow up shortly.</p>
                <p style={{ color: '#1a3a1f', marginTop: '8px' }}>Or call/text: <a href="tel:7347566119" style={{ fontWeight: 700 }}>734-756-6119</a></p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>👤</span>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Your Name"
                    style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>📞</span>
                  <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="Phone Number"
                    style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>📍</span>
                  <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                    placeholder="Property Address"
                    style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none', color: form.service ? '#1f2937' : '#888', appearance: 'auto' }}>
                  <option value="" disabled>Service Needed</option>
                  <option value="Residential Driveway">Residential Driveway</option>
                  <option value="Commercial Lot">Commercial Lot</option>
                  <option value="Salting / De-Icing">Salting / De-Icing</option>
                  <option value="Sidewalk Clearing">Sidewalk Clearing</option>
                  <option value="Multiple Services">Multiple Services</option>
                </select>
                <button type="submit" style={{ background: '#c5e620', color: '#0d1f0f', padding: '18px', borderRadius: '999px', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', marginTop: '4px' }}>
                  SEND MY REQUEST
                </button>
              </form>
            )}
          </div>
        </div>


      </section>

      {/* Footer */}
      <footer style={{ background: '#0d1f0f', color: '#a3c97a', padding: '20px', textAlign: 'center', fontSize: '0.8rem' }}>
        <p>© 2026 Second Nature Snow Removal | Livonia, MI | <a href="tel:7347566119" style={{ color: '#c5e620', fontWeight: 700 }}>734-756-6119</a></p>
      </footer>
    </main>
  );
}



