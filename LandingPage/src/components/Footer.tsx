import React from 'react';
import { PawPrint, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { dark } = useTheme();
  const bg = dark ? '#0F172A' : '#1a2e35';

  const links = [
    { label: 'Protocol', href: '#protocol' },
    { label: 'Privacy', href: '#trust' },
    { label: 'Emergency', href: '#emergency' },
    { label: 'Demo', href: '#demo' },
  ];

  return (
    <footer style={{ background: bg, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #005F63, #8CC63F)' }}>
              <PawPrint size={18} color="#fff" />
            </div>
            <div>
              <p className="font-hand text-xl font-bold text-white">PetOlife</p>
              <p className="text-xs" style={{ color: '#64748b' }}>Unified Pet Identity Infrastructure</p>
            </div>
          </div>

          {/* Pet animation */}
          <div className="text-3xl float-a hidden md:block" title="🐕 🐈">
            🐕 🐈
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:text-green-400"
                style={{ color: '#94a3b8' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: '#475569' }}>
            © 2025 PetOlife. Built with{' '}
            <Heart size={11} className="inline" style={{ color: '#8CC63F' }} />{' '}
            for every pet and their person.
          </p>
          <p className="text-xs font-mono px-3 py-1 rounded-full"
            style={{ background: 'rgba(140,198,63,0.1)', color: '#8CC63F' }}>
            Hackathon Build — Unified Pet Identity Protocol
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
