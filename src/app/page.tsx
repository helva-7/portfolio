import Navbar from '@/components/Navbar';
import MangaCover from '@/components/MangaCover';
import ChapterNav from '@/components/ChapterNav';
import MangaScene from '@/components/MangaScene';
import QuoteDivider from '@/components/QuoteDivider';
import ProjectChapterCard from '@/components/ProjectChapterCard';
import StatSheet from '@/components/StatSheet';
import ContactFinal from '@/components/ContactFinal';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { scenes, projects, skills, cvSummary } from '@/data/portfolio';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-paper text-ink">
      <Navbar />
      <MangaCover />

      <div className="relative">
        <div className="sticky top-[72px] z-40 hidden md:block">
          <ChapterNav />
        </div>

        <QuoteDivider text="I was reading systems before I knew their names." kicker="Page 01" />

        {scenes.map((scene) => (
          <MangaScene key={scene.id} scene={scene} />
        ))}

        <QuoteDivider text="Systems that don't just work — they survive." kicker="Interlude" />

        <section id="projects" className="relative z-10 mx-auto max-w-page overflow-visible px-4 py-24 md:px-6">
          <div className="mb-12">
            <span className="torn-edge-sm inline-block border-[3px] border-ink bg-ink px-4 py-1.5 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
              PROJECT ARCHIVE
            </span>
            <h2 className="paper-texture relative -ml-1 mt-2 inline-block -rotate-1 border-[6px] border-ink px-4 py-1 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.78] tracking-tight text-ink shadow-manga">
              PROJECTS
              <span className="absolute -top-2 -right-2 h-5 w-5 bg-red" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
            </h2>
            <p className="mt-3 max-w-xl font-body text-sm font-bold leading-6 text-ink/60">
              {cvSummary}
            </p>
          </div>

          <div className="space-y-10 md:space-y-14">
            {projects.map((project, i) => (
              <ProjectChapterCard key={project.number} project={project} index={i} />
            ))}
          </div>
        </section>

        <QuoteDivider text="Evalutation complete. Ready for deployment." kicker="STATUS REPORT" />

        <section id="stats" className="relative z-10 mx-auto max-w-page px-4 py-24 md:px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="border-[3px] border-ink bg-ink px-4 py-1.5 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
                ABILITY PROFILE
              </span>
              <h2 className="mt-3 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.78] tracking-tight text-ink">
                STATS
              </h2>
            </div>
          </Reveal>

          <Reveal direction="up">
            <StatSheet skills={skills} />
          </Reveal>
        </section>

        <ContactFinal />
        <Footer />
      </div>
    </main>
  );
}
