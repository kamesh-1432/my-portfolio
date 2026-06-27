// @flow strict
'use client';

import { useState, useEffect, useRef } from 'react';
import { MdOutlineOpenInNew, MdClose, MdLaptopMac } from 'react-icons/md';
import { BsPatchCheckFill } from 'react-icons/bs';
import { GiTrophy } from 'react-icons/gi';
import { awardsData, certificationsData, hackathonsData, workshopsData } from '@/utils/data/achievements-data';

const tabColors = {
  workshops:      { top: '#14b8a6, #06b6d4', badgeCls: 'text-teal-400 bg-teal-900/20 border-teal-700/30',     orgColor: '#2dd4bf', glow: 'rgba(20,184,166,0.22)'  },
  certifications: { top: '#8b5cf6, #ec4899', badgeCls: 'text-violet-400 bg-violet-900/20 border-violet-700/30', orgColor: '#16f2b3', glow: 'rgba(139,92,246,0.28)' },
  awards:         { top: '#8b5cf6, #ec4899', badgeCls: 'text-violet-400 bg-violet-900/20 border-violet-700/30', orgColor: '#16f2b3', glow: 'rgba(139,92,246,0.28)' },
  hackathons:     { top: '#f59e0b, #ef4444', badgeCls: 'text-amber-400 bg-amber-900/20 border-amber-700/30',   orgColor: '#fbbf24', glow: 'rgba(251,191,36,0.22)'  },
};

const tabs = [
  { key: 'workshops',      label: 'Workshops'      },
  { key: 'certifications', label: 'Certifications' },
  { key: 'awards',         label: 'Awards'         },
  { key: 'hackathons',     label: 'Hackathons'     },
];

// ── Improved Modal ──
function Modal({ item, onClose, tabKey }) {
  const [visible, setVisible] = useState(false);
  const c = tabColors[tabKey];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setVisible(true), 10);
    return () => { 
      document.body.style.overflow = ''; 
      clearTimeout(t); 
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 220);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', 
        inset: 0, 
        zIndex: 99999,
        background: `rgba(0,0,0,${visible ? 0.85 : 0})`,
        backdropFilter: `blur(${visible ? 12 : 0}px)`,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        transition: 'all 0.22s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #111827, #1a1443, #0f0c41)',
          border: '1px solid rgba(27,44,104,0.95)',
          borderRadius: '24px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '620px',
          boxShadow: `0 40px 100px ${c.glow}`,
          position: 'relative',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(30px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease',
        }}
      >
        {/* top accent bar */}
        <div style={{ height: '4px', background: `linear-gradient(90deg, transparent, ${c.top}, transparent)` }} />

        {/* close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '16px', right: '16px', zIndex: 10,
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#1f2937', border: '1px solid rgba(139,92,246,0.4)',
            color: '#cbd5e1', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#374151'}
          onMouseLeave={e => e.currentTarget.style.background = '#1f2937'}
        >
          <MdClose size={18} />
        </button>

        {/* Certificate Image Area */}
        <div style={{
          background: '#0a0f1c',
          padding: '40px 24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '280px',
          maxHeight: '420px',
          position: 'relative',
        }}>
          {item.certificateImage ? (
            <img
              src={item.certificateImage}
              alt={item.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#475569' }}>
              <BsPatchCheckFill style={{ fontSize: '72px', opacity: 0.2 }} />
              <p style={{ marginTop: '12px', fontSize: '14px' }}>No certificate image available</p>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div style={{ padding: '24px 32px 32px' }}>
          <h3 style={{ color: '#e2e8f0', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
            {item.title}
          </h3>
          
          <p style={{ color: c.orgColor, fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
            {item.organization}
          </p>
          
          <p style={{ color: '#64748b', fontSize: '13.5px', marginBottom: '20px' }}>
            {item.date}
          </p>

          {item.credentialUrl && (
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px',
                background: `linear-gradient(135deg, ${c.top})`,
                borderRadius: '14px',
                color: '#fff',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              <MdOutlineOpenInNew size={17} />
              View Original Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Card ──
// eslint-disable-next-line no-unused-vars
function AchievementCard({ item, tabKey, onCardClick }) {
  const [hovered, setHovered] = useState(false);
  const c = tabColors[tabKey];
  const isHack = tabKey === 'hackathons';
  const isWork = tabKey === 'workshops';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
      style={{
        width: '260px',
        flexShrink: 0,
        background: 'linear-gradient(135deg, #111827 0%, #1a1443 60%, #0f0c41 100%)',
        border: '1px solid rgba(27,44,104,0.75)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 40px ${c.glow}` : '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* top color line */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${c.top}, transparent)` }} />

      {/* image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '158px',
        background: '#070b18',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {item.certificateImage ? (
          <img
            src={item.certificateImage}
            alt={item.title}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', color: '#334155' }}>
            {isWork ? <MdLaptopMac style={{ fontSize: '38px', opacity: 0.25 }} />
             : isHack ? <GiTrophy style={{ fontSize: '38px', opacity: 0.25 }} />
             : <BsPatchCheckFill style={{ fontSize: '38px', opacity: 0.25 }} />}
            <p style={{ fontSize: '11px', marginTop: '5px' }}>No preview</p>
          </div>
        )}

        {/* hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <span style={{
            background: 'rgba(124,58,237,0.9)',
            color: '#fff', fontSize: '11px', fontWeight: 600,
            padding: '6px 14px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <MdOutlineOpenInNew size={13} /> View
          </span>
        </div>
      </div>

      {/* content */}
      <div style={{ padding: '13px 14px 15px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px', marginBottom: '5px' }}>
          <p style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600, lineHeight: 1.35, flex: 1,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.title}
          </p>
          <span style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '20px',
            border: '1px solid', flexShrink: 0, whiteSpace: 'nowrap',
            color: c.orgColor, background: 'rgba(0,0,0,0.3)',
            borderColor: 'rgba(139,92,246,0.25)',
          }}>
            {item.category || item.result}
          </span>
        </div>

        <p style={{ color: c.orgColor, fontSize: '11px', fontWeight: 500, marginBottom: '4px' }}>{item.organization}</p>

        <p style={{ color: '#475569', fontSize: '11px', lineHeight: 1.55, marginBottom: '10px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.description}
        </p>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #1b2c68, transparent)', marginBottom: '10px' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#475569', fontSize: '10px' }}>{item.date}</span>
          <button
            onClick={e => { e.stopPropagation(); onCardClick(); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '5px 11px', borderRadius: '7px',
              background: `linear-gradient(135deg, ${c.top})`,
              color: '#fff', fontSize: '11px', fontWeight: 600,
              border: 'none', cursor: 'pointer',
            }}
          >
            <MdOutlineOpenInNew size={11} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Marquee track ──
function Marquee({ items, tabKey, onSelectCard }) {
  const trackRef = useRef(null);

  let padded = [...items];
  while (padded.length < 8) padded = [...padded, ...items];
  const doubled = [...padded, ...padded];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '16px 0 24px' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 10, background: 'linear-gradient(to right, #0d1224, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 10, background: 'linear-gradient(to left, #0d1224, transparent)', pointerEvents: 'none' }} />

      <div
        ref={trackRef}
        style={{ display: 'flex', gap: '18px', width: 'max-content', animation: 'ach-marquee 35s linear infinite' }}
        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; }}
        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; }}
      >
        {doubled.map((item, i) => (
          <AchievementCard key={i} item={item} tabKey={tabKey} onCardClick={() => onSelectCard(item)} />
        ))}
      </div>

      <style>{`
        @keyframes ach-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ── Main Component ──
export default function AchievementsSection() {
  const [active, setActive] = useState('workshops'); // Set default tab active to workshops
  const [selectedItem, setSelectedItem] = useState(null);

  const dataMap = {
    workshops: workshopsData,
    certifications: certificationsData,
    awards: awardsData,
    hackathons: hackathonsData,
  };

  return (
    <div id="achievements" style={{ position: 'relative', zIndex: 50, borderTop: '1px solid #25213b', margin: '80px 0', fontFamily: 'Inter, sans-serif' }}>

      {/* top line */}
      <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(-1px)' }}>
        <div style={{ width: '75%', height: '1px', background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} />
      </div>

      {/* glow */}
      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(139,92,246,0.12)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* title */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '36px 0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <span style={{ width: '80px', height: '2px', background: '#1a1443' }} />
          <span style={{ background: '#1a1443', color: '#fff', padding: '8px 20px', fontSize: '18px', fontWeight: 600, borderRadius: '6px' }}>
            Certifications & Awards
          </span>
          <span style={{ width: '80px', height: '2px', background: '#1a1443' }} />
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {tabs.map(tab => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                padding: '7px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                border: isActive ? 'none' : '1px solid rgba(139,92,246,0.4)',
                background: isActive ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'transparent',
                color: isActive ? '#fff' : '#a78bfa',
                cursor: 'pointer', transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
                boxShadow: isActive ? '0 4px 16px rgba(124,58,237,0.35)' : 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* marquee */}
      <Marquee key={active} items={dataMap[active] || []} tabKey={active} onSelectCard={setSelectedItem} />

      {/* Renders safely out here, perfectly centered over the page view */}
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} tabKey={active} />
      )}

    </div>
  );
}