// @flow strict
import Link from 'next/link';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { GiTrophy } from 'react-icons/gi';
import { MdLaptopMac } from 'react-icons/md';

function HackathonCard({ item, type = 'hackathon' }) {
  const isWorkshop = type === 'workshop';

  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        border: '1px solid rgba(55,48,163,0.5)',
        boxShadow: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 48px rgba(251,191,36,0.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div className={`h-[3px] w-full bg-gradient-to-r from-transparent ${isWorkshop ? 'via-teal-400 to-cyan-500' : 'via-amber-400 to-red-500'} to-transparent`}></div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isWorkshop ? 'bg-teal-900/40 border border-teal-700/30' : 'bg-amber-900/30 border border-amber-700/30'}`}>
            {isWorkshop
              ? <MdLaptopMac className="text-teal-400 text-xl" />
              : <GiTrophy className="text-amber-400 text-xl" />
            }
          </div>
          <span className={`text-[11px] px-3 py-1 rounded-full font-medium border ${isWorkshop ? 'bg-teal-900/30 text-teal-400 border-teal-700/30' : 'bg-amber-900/20 text-amber-400 border-amber-700/30'}`}>
            {item.result}
          </span>
        </div>

        <h3 className="text-slate-200 text-sm font-semibold mb-1 leading-snug">{item.title}</h3>
        <p className={`text-xs font-medium mb-3 ${isWorkshop ? 'text-teal-400' : 'text-amber-400'}`}>{item.organization}</p>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">{item.description}</p>

        <div className={`h-[1px] w-full mb-4 bg-gradient-to-r from-transparent ${isWorkshop ? 'via-teal-900' : 'via-amber-900/50'} to-transparent`}></div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 text-[11px]">{item.date}</span>
          {item.credentialUrl && (
            <Link
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[11px] transition-colors no-underline ${isWorkshop ? 'text-teal-400 hover:text-teal-300' : 'text-amber-400 hover:text-amber-300'}`}
            >
              View details <MdOutlineOpenInNew size={12} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HackathonCard;