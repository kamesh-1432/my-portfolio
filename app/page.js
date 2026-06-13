import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import AchievementsSection from "./components/homepage/achievements";
import SkillsSection from "./components/homepage/technical-arsenal";


async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}&per_page=10`,
    {
      cache: 'no-store',
      headers: {
        'User-Agent': 'portfolio-app',
        'Accept': 'application/json',
      }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();
  console.log('Blogs fetched:', data.length);

  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <SkillsSection />
      <Projects />
      <AchievementsSection />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  )
};