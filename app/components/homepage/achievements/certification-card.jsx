// @flow strict
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MdOutlineOpenInNew, MdClose } from 'react-icons/md';
import { BsPatchCheckFill } from 'react-icons/bs';

function CertificationCard({ item }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ── CARD ── */}
      <div className="group relative rounded-2xl border border-[#1b2c68a0] bg-gradient-to-br from-[#111827] via-[#1a1443] to-[#0f0c41] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(139,92,246,0.3)] w-[280px] flex-shrink-0">

        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-violet-500 to-pink-500"></div>

        {/* Certificate image preview — clickable */}
        <div
          className="relative w-full h-[160px] overflow-hidden cursor-pointer bg-[#0a0d1a] border-b border-[#1b2c6860]"
          onClick={() => setShowModal(true)}
        >
          {item.certificateImage ? (
            <Image
              src={item.certificateImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Placeholder when no image */
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <BsPatchCheckFill className="text-violet-400 text-4xl opacity-40" />
              <p className="text-slate-600 text-xs">No preview available</p>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-violet-600/80 px-3 py-1.5 rounded-full">
              <MdOutlineOpenInNew size={14} /> Click to view
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-slate-200 text-sm font-semibold leading-snug flex-1 pr-2">
              {item.title}
            </h3>
            <span className="bg-[#0f172a] text-violet-400 text-[10px] px-2 py-0.5 rounded-full border border-violet-700/30 font-medium flex-shrink-0">
              {item.category}
            </span>
          </div>

          <p className="text-[#16f2b3] text-xs font-medium mb-1">{item.organization}</p>
          <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#1b2c68] to-transparent mb-3"></div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[11px]">{item.date}</span>
            {item.credentialUrl ? (
              <a
                href={item.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-85 transition-all duration-200 hover:scale-105 no-underline"
                onClick={e => e.stopPropagation()}
              >
                <MdOutlineOpenInNew size={12} />
                View Link
              </a>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-400 border border-violet-700/50 hover:bg-[#1b2c68] transition-all duration-200"
              >
                <MdOutlineOpenInNew size={12} />
                View Cert
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL POPUP ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-gradient-to-br from-[#111827] via-[#1a1443] to-[#0f0c41] border border-[#1b2c68] rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Top border */}
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-violet-500 to-pink-500"></div>

            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#1b2c68] border border-violet-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-violet-700 transition-all duration-200"
            >
              <MdClose size={16} />
            </button>

            {/* Certificate image */}
            <div className="relative w-full h-[280px] bg-[#0a0d1a]">
              {item.certificateImage ? (
                <Image
                  src={item.certificateImage}
                  alt={item.title}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <BsPatchCheckFill className="text-violet-400 text-5xl opacity-30" />
                  <p className="text-slate-600 text-sm">No certificate image added</p>
                </div>
              )}
            </div>

            {/* Modal info */}
            <div className="p-5">
              <h2 className="text-slate-100 text-lg font-bold mb-1">{item.title}</h2>
              <p className="text-[#16f2b3] text-sm font-medium mb-1">{item.organization}</p>
              <p className="text-slate-500 text-xs mb-4">{item.date}</p>

              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-90 transition-all no-underline"
                >
                  <MdOutlineOpenInNew size={16} />
                  Open Certificate Link
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CertificationCard;