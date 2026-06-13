// @flow strict

import Link from 'next/link';
import * as React from 'react';
import { FaCode } from 'react-icons/fa';
import { MdOutlineOpenInNew } from 'react-icons/md';

function ProjectCard({ project }) {
  return (
    <div className="group relative rounded-2xl border border-[#1b2c68a0] bg-gradient-to-br from-[#111827] via-[#1a1443] to-[#0f0c41] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)] w-full">

      {/* Subtle glow in top-right corner */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-violet-700/10"></div>

      {/* Top gradient border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>

      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1b2c6840]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>
        </div>
        <p className="text-[#16f2b3] text-sm font-semibold tracking-wide">
          {project.name}
        </p>
        <span className="bg-[#1b2c68] text-violet-400 text-[11px] px-3 py-1 rounded-full border border-violet-700/30 tracking-wide">
          {project.role?.split(' ')[0] || 'Project'}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-5 py-5">

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech Stack */}
        <p className="text-slate-500 text-[11px] uppercase tracking-widest mb-2">Tech Stack</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tools.map((tool, i) => (
            <span
              key={i}
              className="bg-[#0f172a] text-violet-400 text-xs px-3 py-1 rounded-md border border-violet-700/30 font-mono"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#1b2c68] to-transparent mb-5"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="text-slate-500 text-xs">
            Role: <span className="text-amber-400 font-medium">{project.role}</span>
          </p>
          <div className="flex items-center gap-2">
            {project.code && (
              <Link
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-violet-400 border border-violet-700/50 hover:bg-[#1b2c68] transition-all duration-200 hover:scale-105 no-underline"
              >
                <FaCode size={12} />
                Code
              </Link>
            )}
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-85 transition-all duration-200 hover:scale-105 no-underline"
              >
                <MdOutlineOpenInNew size={13} />
                Demo
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProjectCard;