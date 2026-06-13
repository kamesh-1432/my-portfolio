// @flow strict
'use client';

import { useState } from 'react';
import { awardsData, certificationsData, hackathonsData, workshopsData } from '@/utils/data/achievements-data';
import CertificationCard from './certification-card';
import HackathonCard from './hackathon-card';

const tabs = [
  { key: 'certifications', label: 'Certifications' },
  { key: 'awards', label: 'Awards' },
  { key: 'hackathons', label: 'Hackathons' },
  { key: 'workshops', label: 'Workshops' },
];

function AchievementsSection() {
  const [active, setActive] = useState('certifications');

  const dataMap = {
    certifications: certificationsData,
    awards: awardsData,
    hackathons: hackathonsData,
    workshops: workshopsData,
  };

  return (
    <div id="achievements" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Certifications & Awards
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex justify-center gap-3 flex-wrap mb-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              active === tab.key
                ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white border-transparent'
                : 'text-violet-400 border-violet-700/50 bg-transparent hover:bg-[#1b2c68]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(active === 'certifications' || active === 'awards') &&
          dataMap[active].map(item => (
            <CertificationCard key={item.id} item={item} />
          ))
        }
        {active === 'hackathons' &&
          hackathonsData.map(item => (
            <HackathonCard key={item.id} item={item} type="hackathon" />
          ))
        }
        {active === 'workshops' &&
          workshopsData.map(item => (
            <HackathonCard key={item.id} item={item} type="workshop" />
          ))
        }
      </div>

    </div>
  );
}

export default AchievementsSection;