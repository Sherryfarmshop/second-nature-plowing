'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, opens email client with form data
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AAddress: ${form.address}%0AService: ${form.service}%0AMessage: ${form.message}`;
    window.location.href = `mailto:alex@secondnatureplowing.com?subject=Quote Request from ${form.name}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-wide">Second Nature Plowing</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#why-us" className="text-sm text-gray-300 hover:text-white transition-colors">Why Us</a>
            <a href="#service-area" className="text-sm text-gray-300 hover:text-white transition-colors">Service Area</a>
            <a href="#quote" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-semibold transition-colors">Get a Free Quote</a>
          </div>
          <a href="tel:7347566119" className="md:hidden bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold">Call Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #0a1628 100%)'}}>
        {/* Background overlay pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #60a5fa 0%, transparent 50%)'}} />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span>❄️</span>
              <span>Serving Livonia & Surrounding Areas</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Professional<br />
              <span className="text-blue-400">Snow Plowing</span><br />
              You Can Count On
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Fast, reliable snow removal for homes and businesses. We show up when it snows — so you don't have to worry about it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#quote" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-colors shadow-lg">
                Get a Free Quote
              </a>
              <a href="tel:7347566119" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg text-center transition-colors">
                📞 734-756-6119
              </a>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-green-400">✓</span>
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-green-400">✓</span>
                <span>24/7 Storm Response</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-green-400">✓</span>
                <span>Free Quotes</span>
              </div>
            </div>
          </div>

          {/* Right - Truck image placeholder */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#1a3a6b]/50 aspect-[16/10] flex items-center justify-center border border-white/10">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">🚛</div>
                <p className="text-sm">Truck photo coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a1628] mb-4">Our Services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Everything you need to keep your property safe and accessible all winter long.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏠', title: 'Residential Driveways', desc: 'Fast, reliable driveway clearing after every storm. Never get stuck again.' },
              { icon: '🏢', title: 'Commercial Lots', desc: 'Keep your business accessible and safe for customers and employees.' },
              { icon: '🧂', title: 'Salting & De-Icing', desc: 'Pre-treatment and post-storm salting to prevent ice buildup.' },
              { icon: '🚶', title: 'Sidewalk Clearing', desc: 'Safe, cleared walkways for your home or business entrance.' },
            ].map((s) => (
              <div key={s.title} className="bg-[#f0f7ff] rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-[#0a1628] text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Why Choose Second Nature?</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">We treat your property like our own.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Fast Response', desc: 'We\'re on the road during and after every storm — not after the fact.' },
              { icon: '📅', title: 'Seasonal Contracts', desc: 'Set it and forget it. One price, all winter, no surprises.' },
              { icon: '📱', title: 'Easy Communication', desc: 'Text or call Alex directly. No call centers, no runaround.' },
              { icon: '🛡️', title: 'Fully Insured', desc: 'Fully licensed and insured for your peace of mind.' },
              { icon: '⭐', title: 'Local & Reliable', desc: 'Locally owned and operated. We live here too.' },
              { icon: '💲', title: 'Fair Pricing', desc: 'Honest rates with no hidden fees. Per push or seasonal — your choice.' },
            ].map((w) => (
              <div key={w.title} className="flex gap-4 items-start">
                <div className="text-2xl mt-1">{w.icon}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{w.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section id="service-area" className="py-20 bg-[#f0f7ff]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a1628] mb-4">Service Area</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">We serve Livonia, Michigan and all surrounding communities.</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {['Livonia', 'Westland', 'Farmington Hills', 'Canton', 'Plymouth', 'Northville', 'Garden City', 'Dearborn Heights', 'Redford', 'Novi'].map((city) => (
              <span key={city} className="bg-white border border-blue-200 text-[#0a1628] px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
                ❄️ {city}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-6">Not sure if we cover your area? Give Alex a call — 734-756-6119</p>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a1628] mb-4">Get a Free Quote</h2>
            <p className="text-gray-500 text-lg">Fill out the form below and Alex will get back to you within 24 hours.</p>
          </div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Request Sent!</h3>
              <p className="text-green-600">Alex will follow up with you shortly. You can also call or text directly at <a href="tel:7347566119" className="font-bold underline">734-756-6119</a>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#f0f7ff] rounded-2xl p-8 space-y-5 border border-blue-100">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-2">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-2">Phone Number *</label>
                  <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="(734) 555-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="john@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Property Address *</label>
                <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="123 Main St, Livonia, MI" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Service Needed *</label>
                <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select a service...</option>
                  <option value="Residential Driveway">Residential Driveway</option>
                  <option value="Commercial Lot">Commercial Lot</option>
                  <option value="Salting / De-Icing">Salting / De-Icing</option>
                  <option value="Sidewalk Clearing">Sidewalk Clearing</option>
                  <option value="Multiple Services">Multiple Services</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Additional Notes</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-24 resize-none"
                  placeholder="Tell us about your property, any special access notes, etc." />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
                Request My Free Quote →
              </button>
              <p className="text-center text-gray-400 text-xs">Or call/text Alex directly: <a href="tel:7347566119" className="text-blue-600 font-semibold">734-756-6119</a></p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1628] text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Second Nature Plowing</p>
            <p className="text-gray-400 text-sm">Livonia, MI & Surrounding Areas</p>
          </div>
          <div className="text-center">
            <a href="tel:7347566119" className="text-blue-400 hover:text-blue-300 font-bold text-lg">734-756-6119</a>
            <p className="text-gray-500 text-xs mt-1">Call or text anytime</p>
          </div>
          <p className="text-gray-500 text-xs">© 2026 Second Nature Plowing. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
