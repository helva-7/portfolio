import Navbar from '@/components/Navbar';
import BoardMotion from '@/components/BoardMotion';
import BackgroundVideoLayer from '@/components/BackgroundVideoLayer';
import MangaCover from '@/components/MangaCover';
import ChapterNav from '@/components/ChapterNav';
import IntertitleSpawner from '@/components/IntertitleSpawner';
import MangaScene from '@/components/MangaScene';
import QuoteDivider from '@/components/QuoteDivider';
import ProjectsArchive from '@/components/ProjectsArchive';
import StatSheet from '@/components/StatSheet';
import ContactFinal from '@/components/ContactFinal';
import Footer from '@/components/Footer';
import { cvSummary, deconstructionPages, projects, scenes, skills } from '@/data/portfolio';

export default function Home() {
  return (
    <main className="whiteboard-page relative min-h-screen bg-paper text-ink">
      <BoardMotion />
      <BackgroundVideoLayer />
      <Navbar />
      <IntertitleSpawner />
      <MangaCover />

      <div className="manga-board relative">
        <ChapterNav />

        <QuoteDivider {...deconstructionPages[0]} />

        <div className="whiteboard-section whiteboard-section--scenes mx-auto max-w-page px-4 pb-8 md:px-6 lg:pl-12">
          <div className="space-y-12 md:space-y-16">
            <div className="board-note" data-board-note>
              <MangaScene scene={scenes[0]} />
            </div>
          </div>
        </div>

        <QuoteDivider {...deconstructionPages[1]} />

        <div className="whiteboard-section whiteboard-section--scenes mx-auto max-w-page px-4 pb-8 md:px-6 lg:pl-12">
          <div className="space-y-12 md:space-y-16">
            <div className="board-note" data-board-note>
              <MangaScene scene={scenes[1]} />
            </div>
          </div>
        </div>

        <QuoteDivider {...deconstructionPages[2]} />

        <div className="whiteboard-section whiteboard-section--scenes mx-auto max-w-page px-4 pb-8 md:px-6 lg:pl-12">
          <div className="space-y-12 md:space-y-16">
            <div className="board-note" data-board-note>
              <MangaScene scene={scenes[2]} />
            </div>
          </div>
        </div>

        <QuoteDivider {...deconstructionPages[3]} />

        <div className="whiteboard-section whiteboard-section--scenes mx-auto max-w-page px-4 pb-8 md:px-6 lg:pl-12">
          <div className="space-y-12 md:space-y-16">
            <div className="board-note" data-board-note>
              <MangaScene scene={scenes[3]} />
            </div>
          </div>
        </div>

        <QuoteDivider {...deconstructionPages[4]} />

        <section id="projects" className="whiteboard-section whiteboard-section--projects relative z-10 mx-auto max-w-page px-4 py-24 md:px-6 lg:pl-12">
          <ProjectsArchive projects={projects} summary={cvSummary} />
        </section>

        <QuoteDivider {...deconstructionPages[5]} />

        <section id="stats" className="whiteboard-section relative z-10 mx-auto max-w-page px-4 py-24 md:px-6 lg:pl-12">
            <div className="board-note" data-board-note>
              <div className="mb-12 text-center stats-heading">
                <span className="border-[3px] border-ink bg-ink px-4 py-1.5 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
                  ABILITY PROFILE
                </span>
                <h2 className="mt-3 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.78] tracking-tight text-ink">
                  STATS
                </h2>
              </div>
              <StatSheet skills={skills} />
            </div>
        </section>

        <QuoteDivider {...deconstructionPages[6]} />

        <section className="whiteboard-section mx-auto max-w-page px-4 py-24 md:px-6 lg:pl-12">
          <div className="board-note" data-board-note>
            <ContactFinal />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
