import './Marquee.css';

// An endlessly scrolling strip of words. The list is rendered twice so the loop is seamless.
export default function Marquee({ items }) {
  const row = items.map((item) => (
    <span key={item} className="marquee-item">
      {item}
      <span className="marquee-sep" aria-hidden="true">✚</span>
    </span>
  ));
  return (
    <div className="marquee" aria-label={items.join(', ')}>
      <div className="marquee-track" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
