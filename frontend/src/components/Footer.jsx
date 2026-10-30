import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', fontFamily: 'Inter, sans-serif', paddingTop: '60px', paddingBottom: '30px', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Top Section: Brand + Newsletter Banner */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '32px 40px', marginBottom: '50px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', margin: '0 0 6px 0' }}>
              Subscribe to Property Alerts 🏡
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
              Get the latest property listings and real estate market updates directly in your inbox.
            </p>
          </div>
          
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flex: '1', maxWidth: '420px', minWidth: '280px' }}>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s',
              }}
            >
              {subscribed ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Middle Section: Main Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '18px' }}>
                R
              </div>
              <span style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.5px' }}>
                <span className='font-serif text-blue-500'>REAL</span>ESTATE
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#94a3b8', marginBottom: '20px' }}>
              Your trusted platform to find, buy, and rent dream properties easily with transparent pricing and verified listings.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    color: '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  {item[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><Link to="/properties" style={{ color: '#94a3b8', textDecoration: 'none' }}>Browse All Properties</Link></li>
              <li><Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Our Company</Link></li>
              <li><Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact Us</Link></li>
              <li><Link to="/admin" style={{ color: '#94a3b8', textDecoration: 'none' }}>Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Property Types</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><a href="#apartments" style={{ color: '#94a3b8', textDecoration: 'none' }}>Luxury Apartments</a></li>
              <li><a href="#villas" style={{ color: '#94a3b8', textDecoration: 'none' }}>Independent Villas</a></li>
              <li><a href="#commercial" style={{ color: '#94a3b8', textDecoration: 'none' }}>Commercial Spaces</a></li>
              <li><a href="#plots" style={{ color: '#94a3b8', textDecoration: 'none' }}>Residential Plots</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span>📍</span>
                <span>South Extension, New Delhi, India 110049</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span>📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span>✉️</span>
                <span>support@realestate.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#64748b' }}>
          <div>
            © {new Date().getFullYear()} Real Estate Project. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#sitemap" style={{ color: '#64748b', textDecoration: 'none' }}>Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;