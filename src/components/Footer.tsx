export default function Footer() {
  return (
    <footer className="relative z-10 border-t-[6px] border-ink bg-ink py-6">
      <div className="mx-auto max-w-page px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <span className="font-display text-xl tracking-widest text-paper/80">
            FAHD
          </span>
          <p className="font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper/40">
            &copy; {new Date().getFullYear()} — Built with ink and purpose
          </p>
          <span className="font-body text-[0.5rem] font-black uppercase tracking-[0.15em] text-paper/30">
            THE EXCEPTION
          </span>
        </div>
      </div>
    </footer>
  );
}
