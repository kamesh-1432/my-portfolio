// @flow strict
'use client';

import { useEffect, useRef, useState } from 'react';
import { skillsData } from '@/utils/data/skills-data';

const colorMap = {
  violet: {
    border: 'border-l-violet-500',
    label: 'text-violet-400',
    pill: 'bg-[#1b2c68]/40 text-violet-300 border border-violet-700/30 hover:bg-violet-700/20 hover:border-violet-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]',
  },
  pink: {
    border: 'border-l-pink-500',
    label: 'text-pink-400',
    pill: 'bg-pink-900/20 text-pink-300 border border-pink-700/30 hover:bg-pink-700/20 hover:border-pink-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(236,72,153,0.15)]',
  },
  amber: {
    border: 'border-l-amber-400',
    label: 'text-amber-400',
    pill: 'bg-amber-900/20 text-amber-300 border border-amber-700/30 hover:bg-amber-700/20 hover:border-amber-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(245,158,11,0.15)]',
  },
  green: {
    border: 'border-l-emerald-400',
    label: 'text-emerald-400',
    pill: 'bg-emerald-900/20 text-emerald-300 border border-emerald-700/30 hover:bg-emerald-700/20 hover:border-emerald-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)]',
  },
  blue: {
    border: 'border-l-blue-400',
    label: 'text-blue-400',
    pill: 'bg-blue-900/20 text-blue-300 border border-blue-700/30 hover:bg-blue-700/20 hover:border-blue-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(96,165,250,0.15)]',
  },
  teal: {
    border: 'border-l-teal-400',
    label: 'text-teal-400',
    pill: 'bg-teal-900/20 text-teal-300 border border-teal-700/30 hover:bg-teal-700/20 hover:border-teal-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(20,184,166,0.15)]',
  },
  rose: {
    border: 'border-l-rose-400',
    label: 'text-rose-400',
    pill: 'bg-rose-900/20 text-rose-300 border border-rose-700/30 hover:bg-rose-700/20 hover:border-rose-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(251,113,133,0.15)]',
  },
  indigo: {
    border: 'border-l-indigo-400',
    label: 'text-indigo-400',
    pill: 'bg-indigo-900/20 text-indigo-300 border border-indigo-700/30 hover:bg-indigo-700/20 hover:border-indigo-500/50',
    glow: 'group-hover:shadow-[0_8px_32px_rgba(129,140,248,0.15)]',
  },
};

function SkillCard({ cluster, index, isVisible }) {
  const c = colorMap[cluster.color] || colorMap.violet;

  return (
    <div
      className={`group relative rounded-xl bg-gradient-to-br from-[#0d1224] to-[#0a0d37] border border-[#1b2c68a0] border-l-[3px] ${c.border} transition-all duration-400 hover:-translate-y-1 ${c.glow}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.3s ease`,
      }}
    >
      <div className="p-5">
        {/* Category Label */}
        <div className="flex items-center gap-3 mb-4">
          <p className={`text-[11px] font-bold uppercase tracking-[2.5px] ${c.label}`}>
            {cluster.category}
          </p>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#1b2c68] to-transparent"></div>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2">
          {cluster.skills.map((skill, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-default hover:-translate-y-0.5 ${c.pill}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.4s ease ${(index * 80) + (i * 40)}ms`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="technical-arsenal"
      ref={ref}
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      {/* Top gradient line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Ambient glow */}
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20 pointer-events-none"></div>

      {/* Section Title */}
      <div className="flex flex-col items-center my-5 lg:py-8 gap-3">
        <p className="text-[#16f2b3] text-xs uppercase tracking-[3px] font-medium">Expertise</p>
        <div className="flex items-center gap-0">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Technical Arsenal
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
        <p className="text-slate-500 text-sm text-center max-w-md">
          A comprehensive overview of languages, frameworks, libraries, and tools I use to build modern products.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {skillsData.map((cluster, i) => (
          <SkillCard
            key={cluster.id}
            cluster={cluster}
            index={i}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}