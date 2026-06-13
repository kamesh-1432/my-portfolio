// @flow strict
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  awardsData,
  certificationsData,
  hackathonsData,
  workshopsData,
} from '@/utils/data/achievements-data';

import CertificationCard from './certification-card';
import HackathonCard from './hackathon-card';

const tabs = [
  { key: 'certifications', label: 'Certifications' },
  { key: 'awards', label: 'Awards' },
  { key: 'hackathons', label: 'Hackathons' },
  { key: 'workshops', label: 'Workshops' },
];

function MarqueeRow({
  children,
  reverse = false,
  speed = 120, // px/sec
}) {
  const contentRef = useRef(null);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const updateDuration = () => {
      if (!contentRef.current) return;

      // Since we render 4 copies,
      // divide by 4 to get original content width.
      const contentWidth = contentRef.current.scrollWidth / 4;

      const calculatedDuration = contentWidth / speed;

      setDuration(Math.max(calculatedDuration, 15));
    };

    updateDuration();

    const resizeObserver = new ResizeObserver(() => {
      updateDuration();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener('resize', updateDuration);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDuration);
    };
  }, [children, speed]);

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left Fade */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '80px',
          zIndex: 10,
          background:
            'linear-gradient(to right, #0d1224, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Right Fade */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '80px',
          zIndex: 10,
          background:
            'linear-gradient(to left, #0d1224, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={contentRef}
        className={reverse ? 'marquee-reverse' : 'marquee'}
        style={{
          display: 'flex',
          gap: '20px',
          width: 'max-content',
          animationDuration: `${duration}s`,
        }}
      >
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}

function AchievementsSection() {
  const [active, setActive] = useState('certifications');

  const getCards = () => {
    if (active === 'certifications') {
      return certificationsData.map((item) => (
        <CertificationCard
          key={item.id}
          item={item}
        />
      ));
    }

    if (active === 'awards') {
      return awardsData.map((item) => (
        <CertificationCard
          key={item.id}
          item={item}
        />
      ));
    }

    if (active === 'hackathons') {
      return hackathonsData.map((item) => (
        <HackathonCard
          key={item.id}
          item={item}
          type="hackathon"
        />
      ));
    }

    if (active === 'workshops') {
      return workshopsData.map((item) => (
        <HackathonCard
          key={item.id}
          item={item}
          type="workshop"
        />
      ));
    }

    return null;
  };

  return (
    <div
      id="achievements"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <style>{`
        .marquee {
          animation: marquee-scroll linear infinite;
          will-change: transform;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        .marquee-reverse {
          animation: marquee-scroll-reverse linear infinite;
          will-change: transform;
        }

        .marquee-reverse:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-scroll-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Top Gradient Line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Glow */}
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20 pointer-events-none" />

      {/* Title */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]" />
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Certifications & Awards
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 flex-wrap mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
              active === tab.key
                ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white border-transparent shadow-lg shadow-violet-500/20'
                : 'text-violet-400 border-violet-700/50 hover:bg-[#1b2c68]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Marquee */}
      <div className="flex flex-col gap-5">
        <MarqueeRow speed={30}>
          {getCards()}
        </MarqueeRow>
      </div>
    </div>
  );
}

export default AchievementsSection;