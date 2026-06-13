// @flow strict
import Link from 'next/link';
import { BsPatchCheckFill } from 'react-icons/bs';
import { MdOutlineOpenInNew } from 'react-icons/md';

function CertificationCard({ item }) {
  return (
    <div className="group relative rounded-2xl border border-[#1b2c68a0] bg-gradient-to-br from-[#111827] via-[#1a1443] to-[#0f0c41] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(139,92,246,0.3)]">

      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-violet-500 to-pink-500"></div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#1b2c68] border border-violet-700/30 flex items-center justify-center flex-shrink-0">
            <BsPatchCheckFill className="text-violet-400 text-xl" />
          </div>
          <span className="bg-[#0f172a] text-violet-400 text-[11px] px-3 py-1 rounded-full border border-violet-700/30 font-medium">
            {item.category}
          </span>
        </div>

        <h3 className="text-slate-200 text-sm font-semibold mb-1 leading-snug">
          {item.title}
        </h3>
        <p className="text-[#16f2b3] text-xs font-medium mb-3">{item.organization}</p>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">{item.description}</p>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#1b2c68] to-transparent mb-4"></div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 text-[11px]">{item.date}</span>
          {item.credentialUrl && (
            <Link
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 transition-colors no-underline"
            >
              View credential <MdOutlineOpenInNew size={12} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificationCard;