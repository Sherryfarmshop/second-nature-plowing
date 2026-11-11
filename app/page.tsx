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
    window.location.href = `mailto:alex@secondnatureplowing.com?subject=Snow Removal Quote Request from ${form.name}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* HERO SECTION - full background */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d1f0f 0%, #1a3a1f 40%, #1a3a1f 70%, #0d2010 100%)' }}>

        {/* Background plow truck image placeholder */}
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/plow-truck.jpg"
            alt="Snow plow truck clearing a snowy road"
            fill
            className="object-cover object-right"
            priority
          />
        </div>

        {/* Dark overlay on left side for text readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,31,15,0.85) 0%, rgba(13,31,15,0.6) 50%, rgba(13,31,15,0.1) 100%)' }} />

        {/* NAVBAR */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <svg width="20" height="30" viewBox="0 0 20 30" fill="#7cb518">
                <path d="M10 0L0 12h4L0 22h7v8h6v-8h7L16 12h4z"/>
              </svg>
              <svg width="20" height="30" viewBox="0 0 20 30" fill="#5a9010">
                <path d="M10 0L0 12h4L0 22h7v8h6v-8h7L16 12h4z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'white', lineHeight: 1.1, letterSpacing: '0.05em' }}>SECOND<br />NATURE</div>
              <div style={{ fontSize: '0.65rem', color: '#a3c97a', letterSpacing: '0.15em', fontWeight: 600 }}>SNOW REMOVAL</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" style={{ color: 'white', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>Home</a>
            <a href="#quote" style={{ color: 'white', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>Snow Removal</a>
            <a href="#quote" style={{ background: '#c5e620', color: '#0d1f0f', padding: '10px 24px', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>Get a Quote</a>
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
                <path d="M0 4 Q25 0 50 4 Q75 8 100 4" stroke="#c5e620" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#e8f5d0', fontStyle: 'italic', marginBottom: '2rem', fontWeight: 400 }}>
            We&apos;ll handle the driveway.
          </p>
          <a href="#quote" style={{ display: 'inline-block', background: '#c5e620', color: '#0d1f0f', padding: '18px 40px', borderRadius: '999px', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', letterSpacing: '0.05em' }}>
            GET A FREE QUOTE →
          </a>
        </div>

        {/* Wavy snow divider + pine trees */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {/* Pine tree silhouettes */}
          <div style={{ position: 'relative', height: '120px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px' }}>
            {[...Array(12)].map((_, i) => (
              <svg key={i} width={30 + (i % 3) * 10} height={60 + (i % 4) * 20} viewBox="0 0 30 80" style={{ opacity: 0.6 + (i % 3) * 0.1 }}>
                <path d="M15 0L0 30h8L2 55h11v25h4V55h11L22 30h8z" fill="#0a2a0d"/>
              </svg>
            ))}
          </div>
          {/* Wavy snow hill */}
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,10 1200,40 C1300,55 1380,30 1440,40 L1440,80 L0,80 Z" fill="#f0ece2"/>
          </svg>
        </div>
      </section>

      {/* BOTTOM SECTION - cream/dark green */}
      <section id="quote" style={{ background: '#1a3a1f', padding: '0 0 60px 0' }}>
        {/* Pine tree row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px', marginBottom: '20px', alignItems: 'flex-end' }}>
          {[...Array(10)].map((_, i) => (
            <svg key={i} width={25 + (i % 3) * 8} height={50 + (i % 3) * 15} viewBox="0 0 30 80" style={{ opacity: 0.5 }}>
              <path d="M15 0L0 30h8L2 55h11v25h4V55h11L22 30h8z" fill="#0a2a0d"/>
            </svg>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          {/* Left - family photo / video placeholder */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#0d2510', aspectRatio: '4/3', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src="/family-photo.jpg"
              alt="Happy family enjoying a snow day"
              fill
              className="object-cover"
            />
            {/* Play button overlay */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a3a1f">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
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

        {/* Bottom pine trees */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px 10px 0', alignItems: 'flex-end' }}>
          {[...Array(14)].map((_, i) => (
            <svg key={i} width={20 + (i % 4) * 8} height={40 + (i % 5) * 15} viewBox="0 0 30 80" style={{ opacity: 0.4 + (i % 3) * 0.1 }}>
              <path d="M15 0L0 30h8L2 55h11v25h4V55h11L22 30h8z" fill="#0a2a0d"/>
            </svg>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0d1f0f', color: '#a3c97a', padding: '20px', textAlign: 'center', fontSize: '0.8rem' }}>
        <p>© 2026 Second Nature Snow Removal | Livonia, MI | <a href="tel:7347566119" style={{ color: '#c5e620', fontWeight: 700 }}>734-756-6119</a></p>
      </footer>
    </main>
  );
}
