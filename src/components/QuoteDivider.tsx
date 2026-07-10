import type { DeconstructionPage } from '@/data/portfolio';

type QuoteDividerProps = Pick<DeconstructionPage, 'id' | 'kicker' | 'keyword' | 'sceneHeight'>;

export default function QuoteDivider({ id, kicker, keyword, sceneHeight = 'tall' }: QuoteDividerProps) {
  return (
    <section
      className={`intertitle-trigger intertitle-trigger--${sceneHeight} whiteboard-section`}
      data-intertitle-trigger
      data-intertitle-id={id}
      aria-hidden
    >
      <div className="intertitle-trigger__track" />
      <div className="intertitle-trigger__label">
        <span className="intertitle-trigger__kicker">{kicker}</span>
        <span className="intertitle-trigger__keyword">{keyword}</span>
      </div>
    </section>
  );
}
