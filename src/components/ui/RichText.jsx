// Renders a string with **bold** and *italic* markers as real <strong>/<em> tags.
// Keeps the content files free of raw HTML.
export default function RichText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
