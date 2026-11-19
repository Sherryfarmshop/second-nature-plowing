'use client';

import { useForm, ValidationError } from '@formspree/react';

export default function QuoteForm() {
  const [state, handleSubmit] = useForm('mjywvowk');

  if (state.succeeded) {
    return (
      <div style={{ background: '#E8C547', borderRadius: '12px', padding: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</div>
        <p style={{ fontWeight: 700, color: '#063F32', fontSize: '1.1rem' }}>Request sent! Alex will follow up shortly.</p>
        <p style={{ color: '#063F32', marginTop: '8px' }}>Or call/text: <a href="tel:7347566119" style={{ fontWeight: 700 }}>734-756-6119</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>👤</span>
        <input required name="name" placeholder="Your Name"
          style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
        />
        <ValidationError field="name" prefix="Name" errors={state.errors} />
      </div>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>📞</span>
        <input required name="phone" placeholder="Phone Number"
          style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
        />
        <ValidationError field="phone" prefix="Phone" errors={state.errors} />
      </div>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>📍</span>
        <input required name="address" placeholder="Property Address"
          style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
        />
        <ValidationError field="address" prefix="Address" errors={state.errors} />
      </div>
      <select required name="service"
        style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', background: '#f0ece2', fontSize: '0.95rem', outline: 'none' }}>
        <option value="" disabled>Service Needed</option>
        <option value="Residential Driveway">Residential Driveway</option>
        <option value="Commercial Lot">Commercial Lot</option>
        <option value="Salting / De-Icing">Salting / De-Icing</option>
        <option value="Sidewalk Clearing">Sidewalk Clearing</option>
        <option value="Multiple Services">Multiple Services</option>
      </select>
      <ValidationError field="service" prefix="Service" errors={state.errors} />
      <button type="submit" disabled={state.submitting}
        style={{ background: '#E8C547', color: '#063F32', padding: '18px', borderRadius: '999px', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', marginTop: '4px', opacity: state.submitting ? 0.7 : 1, width: '100%' }}>
        {state.submitting ? 'SENDING...' : 'SEND MY REQUEST'}
      </button>
    </form>
  );
}
