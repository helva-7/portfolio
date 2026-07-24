import Navbar from '@/components/Navbar';
import CommandCenter from '@/components/CommandCenter';
import MangaCover from '@/components/MangaCover';
import MangaScene from '@/components/MangaScene';
import QuoteDivider from '@/components/QuoteDivider';
import MangaPanelSequence from '@/components/MangaPanelSequence';
import ProjectsArchive from '@/components/ProjectsArchive';
import StatSheet from '@/components/StatSheet';
import SkillLoadout from '@/components/SkillLoadout';
import SiteCaseStudy from '@/components/SiteCaseStudy';
import ContactFinal from '@/components/ContactFinal';
import Footer from '@/components/Footer';
import AnomalyField from '@/components/AnomalyField';
import { cvSummary, deconstructionPages, navLinks, profile, projects, scenes, skillLoadouts, skills } from '@/data/portfolio';

export default function Home() {
  return (
    <main className="whiteboard-page relative min-h-screen bg-paper text-ink">
      <CommandCenter navLinks={navLinks} skillLoadouts={skillLoadouts} github={profile.github} linkedin={profile.linkedin} email={profile.email} />
      <AnomalyField />
      <Navbar />
      <MangaCover />

      <div className="manga-board relative">
        {scenes.map((scene, index) => (
          <div key={scene.id}>
            <QuoteDivider {...deconstructionPages[index]} />
            <div className="whiteboard-section whiteboard-section--scenes mx-auto max-w-page px-4 md:px-6 lg:pl-12">
              <div className="board-note" data-board-note data-board-variant={['origin', 'proof', 'incident', 'method'][index]}>
                <MangaScene scene={scene} />
              </div>
            </div>
          </div>
        ))}

        <QuoteDivider {...deconstructionPages[4]} />

        <MangaPanelSequence />

        <section id="projects" tabIndex={-1} className="whiteboard-section whiteboard-section--projects relative z-10 mx-auto max-w-page px-4 py-24 md:px-6 lg:pl-12">
          <ProjectsArchive projects={projects} summary={cvSummary} />
        </section>

        <QuoteDivider {...deconstructionPages[5]} />

        <section id="stats" tabIndex={-1} className="whiteboard-section relative z-10 mx-auto max-w-page px-4 py-24 md:px-6 lg:pl-12">
            <div className="board-note" data-board-note data-board-variant="stats">
              <div className="mb-12 text-center stats-heading">
                <span className="border-[3px] border-ink bg-ink px-4 py-1.5 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
                  ABILITY PROFILE
                </span>
                <h2 className="mt-3 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.78] tracking-tight text-ink">
                  STATS
                </h2>
              </div>
              <StatSheet skills={skills} />
              <SkillLoadout loadouts={skillLoadouts} projects={projects} />
            </div>
        </section>

        <section id="site-build" tabIndex={-1} className="whiteboard-section relative z-10 mx-auto max-w-page px-4 py-24 md:px-6 lg:pl-12">
          <SiteCaseStudy />
        </section>

        <QuoteDivider {...deconstructionPages[6]} />

        <section id="contact" tabIndex={-1} className="whiteboard-section mx-auto max-w-page px-4 py-24 md:px-6 lg:pl-12">
          <div className="board-note" data-board-note data-board-variant="contact">
            <ContactFinal />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
