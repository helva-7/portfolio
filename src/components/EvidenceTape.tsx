import type { EvidenceItem } from '@/data/portfolio';

interface EvidenceTapeProps {
  items: EvidenceItem[];
}

export default function EvidenceTape({ items }: EvidenceTapeProps) {
  if (!items.length) return null;

  return (
    <dl className="evidence-tape" aria-label="Project evidence">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="evidence-tape__item">
          <dt>{item.label}</dt>
          <dd>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
