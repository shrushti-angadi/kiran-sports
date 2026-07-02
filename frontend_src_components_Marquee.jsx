"import { SHOP } from \"../lib/api\";

const items = [
  \"Cricket · Football · Tennis · Basketball · Volleyball\",
  SHOP.kannada,
  \"Trusted in Dharwad since decades\",
  \"Authentic gear · Tournament grade\",
];

export default function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div data-testid=\"hero-marquee\" className=\"overflow-hidden whitespace-nowrap bg-[#FF3B30] py-3 flex items-center\">
      <div className=\"animate-marquee flex\">
        {repeated.map((t, i) => (
          <span key={i} className=\"font-heading text-2xl uppercase tracking-[0.25em] text-black px-10 flex items-center\">
            {t}
            <span className=\"ml-10 inline-block w-2 h-2 bg-black\" />
          </span>
        ))}
      </div>
    </div>
  );
}
"
