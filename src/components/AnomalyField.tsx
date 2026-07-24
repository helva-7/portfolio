export default function AnomalyField() {
  return (
    <div className="anomaly-field" aria-hidden>
      <span className="anomaly-field__rail anomaly-field__rail--left">FRAME / UNSTABLE / 013</span>
      <span className="anomaly-field__rail anomaly-field__rail--right">RULESET // REJECTED</span>

      <span className="anomaly-field__slice anomaly-field__slice--one" />
      <span className="anomaly-field__slice anomaly-field__slice--two" />
      <span className="anomaly-field__slice anomaly-field__slice--three" />
      <span className="anomaly-field__slice anomaly-field__slice--four" />

      <span className="anomaly-field__registration anomaly-field__registration--red" />
      <span className="anomaly-field__registration anomaly-field__registration--blue" />

      <span className="anomaly-field__note anomaly-field__note--one">OUTSIDE / 01</span>
      <span className="anomaly-field__note anomaly-field__note--two">NO SAFE FRAME</span>
      <span className="anomaly-field__crosshair">+</span>
    </div>
  );
}
