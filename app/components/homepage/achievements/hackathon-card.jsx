// @flow strict
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MdOutlineOpenInNew, MdLaptopMac, MdClose } from 'react-icons/md';
import { GiTrophy } from 'react-icons/gi';

function HackathonCard({ item, type = 'hackathon' }) {
  const [showModal, setShowModal] = useState(false);
  const isWorkshop = type === 'workshop';

  const topGradient = isWorkshop
    ? 'from-transparent via-teal-400 to-cyan-500'
    : 'from-transparent via-amber-400 to-red-500';

  const badgeStyle = isWorkshop
    ? 'bg-teal-900/30 text-teal-400 border-teal-700/30'
    : 'bg-amber-900/20 text-amber-400 border-amber-700/30';

  const iconStyle = isWorkshop
    ? 'bg-teal-900/40 border-teal-700/30'
    : 'bg-amber-900/30 border-amber-700/30';

  const btnStyle = isWorkshop
    ? 'bg-gradient-to-r from-teal-600 to-cyan-500'
    : 'bg-gradient-to-r from-amber-500 to-red-500';

  const orgColor = isWorkshop ? 'text-teal-400' : 'text-amber-400';

  return (
    <>
      {/* ── CARD ── */}
      <div
        className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 w-[280px] flex-shrink-0"
        style={{ background:'linear-gradient(135deg,#0f172a,#1e1b4b)', border:'1px solid rgba(55,48,163,0.5)' }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = isWorkshop ? '0 16px 48px rgba(20,184,166,0.18)' : '0 16px 48px rgba(251,191,36,0.18)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <div className={`h-[3px] w-full bg-gradient-to-r ${topGradient} to-transparent`}></div>

        {/* Certificate image — clickable */}
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
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              {isWorkshop
                ? <MdLaptopMac className="text-teal-400 text-4xl opacity-30" />
                : <GiTrophy className="text-amber-400 text-4xl opacity-30" />
              }
              <p className="text-slate-600 text-xs">No preview available</p>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full">
              <MdOutlineOpenInNew size={14} /> Click to view
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-slate-200 text-sm font-semibold leading-snug flex-1 pr-2">{item.title}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border flex-shrink-0 ${badgeStyle}`}>
              {item.result}
            </span>
          </div>

          <p className={`text-xs font-medium mb-1 ${orgColor}`}>{item.organization}</p>
          <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>

          <div className={`h-[1px] w-full mb-3 bg-gradient-to-r from-transparent ${isWorkshop ? 'via-teal-900' : 'via-amber-900/50'} to-transparent`}></div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[11px]">{item.date}</span>
            {item.credentialUrl ? (
              <a
                href={item.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white ${btnStyle} hover:opacity-85 transition-all duration-200 hover:scale-105 no-underline`}
              >
                <MdOutlineOpenInNew size={12} /> View Link
              </a>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white ${btnStyle} hover:opacity-85 transition-all duration-200`}
              >
                <MdOutlineOpenInNew size={12} /> View Cert
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL POPUP ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl border border-[#1b2c68]"
            style={{ background:'linear-gradient(135deg,#111827,#1a1443,#0f0c41)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className={`h-[3px] w-full bg-gradient-to-r ${topGradient} to-transparent`}></div>

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#1b2c68] border border-[#534ab740] flex items-center justify-center text-slate-300 hover:text-white hover:bg-violet-700 transition-all"
            >
              <MdClose size={16} />
            </button>

            {/* Image */}
            <div className="relative w-full h-[280px] bg-[#0a0d1a]">
              {item.certificateImage ? (
                <Image src={item.certificateImage} alt={item.title} fill className="object-contain p-4" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  {isWorkshop
                    ? <MdLaptopMac className="text-teal-400 text-5xl opacity-30" />
                    : <GiTrophy className="text-amber-400 text-5xl opacity-30" />
                  }
                  <p className="text-slate-600 text-sm">No certificate image added</p>
                </div>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-slate-100 text-lg font-bold mb-1">{item.title}</h2>
              <p className={`text-sm font-medium mb-1 ${orgColor}`}>{item.organization}</p>
              <p className="text-slate-500 text-xs mb-4">{item.date}</p>
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white ${btnStyle} hover:opacity-90 transition-all no-underline`}
                >
                  <MdOutlineOpenInNew size={16} /> Open Certificate Link
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HackathonCard;