import Navbar from '@/components/Navbar';
import MangaCover from '@/components/MangaCover';
import MangaScene from '@/components/MangaScene';
import ProjectChapterCard from '@/components/ProjectChapterCard';
import StatSheet from '@/components/StatSheet';
import ContactFinal from '@/components/ContactFinal';
import Footer from '@/components/Footer';
import PinPaper from '@/components/PinPaper';
import { scenes, projects, skills, cvSummary } from '@/data/portfolio';

export default function Home() {
  return (
    <main className="relative min-h-screen text-ink">
      <Navbar />
      <MangaCover />

      <div className="relative z-10 mx-auto max-w-5xl space-y-16 px-4 pb-32 pt-16 md:space-y-24 md:px-8 md:pt-24">
        {scenes.map((scene, i) => (
          <PinPaper
            key={scene.id}
            rotate={i % 2 === 0 ? -1.5 : 1.2}
            delay={i * 150}
          >
            <MangaScene scene={scene} />
          </PinPaper>
        ))}

        {projects.length > 0 && (
          <div>
            <PinPaper
              rotate={-1}
              delay={scenes.length * 150}
              noPin
            >
              <div className="mb-6">
                <span className="inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.5rem] font-black uppercase tracking-[0.2em] text-paper">
                  PROJECT ARCHIVE
                </span>
                <h2 className="mt-2 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.78] tracking-tight text-ink">
                  PROJECTS
                </h2>
                <p className="mt-2 max-w-xl font-body text-sm font-bold leading-6 text-ink/60">
                  {cvSummary}
                </p>
              </div>

              <div className="space-y-10 md:space-y-14">
                {projects.map((project, i) => (
                  <PinPaper
                    key={project.number}
                    rotate={i % 2 === 0 ? -2 : 1.8}
                    delay={i * 200}
                  >
                    <ProjectChapterCard project={project} index={i} />
                  </PinPaper>
                ))}
              </div>
            </PinPaper>
          </div>
        )}

        <PinPaper rotate={0.8} delay={400}>
          <div className="mb-4 text-center">
            <span className="inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.5rem] font-black uppercase tracking-[0.2em] text-paper">
              ABILITY PROFILE
            </span>
            <h2 className="mt-2 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.78] tracking-tight text-ink">
              STATS
            </h2>
          </div>
          <StatSheet skills={skills} />
        </PinPaper>

        <PinPaper rotate={-0.9} delay={500}>
          <ContactFinal />
        </PinPaper>
      </div>

      <Footer />
    </main>
  );
}
