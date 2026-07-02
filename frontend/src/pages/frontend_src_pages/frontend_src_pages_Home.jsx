"import { useEffect, useState } from \"react\";
import { Link } from \"react-router-dom\";
import { ArrowRight, ShieldCheck, Trophy, Truck } from \"lucide-react\";
import { api, HERO_IMAGE, CATEGORY_IMAGES, CATEGORIES, SHOP } from \"../lib/api\";
import Marquee from \"../components/Marquee\";
import ProductCard from \"../components/ProductCard\";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get(\"/products/featured\").then((r) => setFeatured(r.data)).catch(() => {});
  }, []);

  return (
    <div data-testid=\"home-page\">
      {/* HERO */}
      <section className=\"relative h-[92vh] min-h-[640px] flex items-center justify-center text-center overflow-hidden\">
        <img
          src={HERO_IMAGE}
          alt=\"Athlete in action\"
          className=\"absolute inset-0 w-full h-full object-cover\"
        />
        <div className=\"absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-[#0A0A0A] z-10\" />
        <div className=\"relative z-20 max-w-4xl px-6 flex flex-col items-center gap-6\">
          <div className=\"text-[11px] tracking-[0.5em] uppercase text-[#FF3B30] font-bold\">
            {SHOP.kannada} · Est. Dharwad
          </div>
          <h1 className=\"font-heading text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] uppercase tracking-tight\">
            Gear up.<br />
            <span className=\"text-[#FF3B30]\">Play harder.</span>
          </h1>
          <p className=\"text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed\">
            North Karnataka's most trusted sporting goods store. Cricket, football,
            tennis, basketball, volleyball — everything an athlete needs, under one roof.
          </p>
          <div className=\"flex flex-col sm:flex-row gap-4 mt-4\">
            <Link
              to=\"/shop\"
              data-testid=\"hero-cta-shop\"
              className=\"bg-[#FF3B30] text-white hover:bg-[#D62828] transition-colors font-bold uppercase tracking-[0.25em] text-sm px-8 py-4 flex items-center justify-center gap-3\"
            >
              Shop the catalog <ArrowRight size={18} />
            </Link>
            <Link
              to=\"/contact\"
              data-testid=\"hero-cta-visit\"
              className=\"bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/5 transition-colors font-bold uppercase tracking-[0.25em] text-sm px-8 py-4\"
            >
              Visit the store
            </Link>
          </div>
        </div>
        <div className=\"absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.5em] uppercase text-white/40\">
          Scroll · Explore
        </div>
      </section>

      <Marquee />

      {/* TRUST STRIP */}
      <section className=\"border-y border-white/10 bg-[#0A0A0A]\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8\">
          {[
            { icon: ShieldCheck, title: \"100% Authentic\", desc: \"Sourced directly from official distributors\" },
            { icon: Trophy, title: \"Tournament Grade\", desc: \"Approved gear used by competitive athletes\" },
            { icon: Truck, title: \"In-store Pickup\", desc: \"Visit our shop on Civil Hospital Road, Dharwad\" },
          ].map((t, i) => (
            <div key={i} className=\"flex items-start gap-4\">
              <t.icon className=\"text-[#FF3B30] shrink-0 mt-1\" size={28} strokeWidth={1.5} />
              <div>
                <div className=\"font-heading text-lg uppercase tracking-wider text-white\">{t.title}</div>
                <div className=\"text-sm text-gray-400 mt-1\">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES BENTO */}
      <section className=\"max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28\">
        <div className=\"flex items-end justify-between mb-12\">
          <div>
            <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-3\">
              01 · Categories
            </div>
            <h2 className=\"font-heading text-4xl sm:text-5xl uppercase tracking-tight leading-none text-white\">
              Pick your <span className=\"text-[#FF3B30]\">arena</span>
            </h2>
          </div>
          <Link
            to=\"/shop\"
            data-testid=\"categories-view-all\"
            className=\"hidden sm:inline text-xs font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-[#FF3B30] transition-colors\"
          >
            View all →
          </Link>
        </div>

        <div className=\"grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]\">
          {[
            { name: \"Cricket\", span: \"md:col-span-7 md:row-span-2\" },
            { name: \"Football\", span: \"md:col-span-5\" },
            { name: \"Basketball\", span: \"md:col-span-5\" },
            { name: \"Tennis\", span: \"md:col-span-6\" },
            { name: \"Volleyball\", span: \"md:col-span-6\" },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              data-testid={`home-category-${cat.name.toLowerCase()}`}
              className={`relative group overflow-hidden border border-white/10 hover:border-[#FF3B30] transition-all ${cat.span}`}
            >
              <img
                src={CATEGORY_IMAGES[cat.name]}
                alt={cat.name}
                className=\"absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700\"
              />
              <div className=\"absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent\" />
              <div className=\"absolute inset-0 p-6 flex flex-col justify-between\">
                <div className=\"text-[10px] tracking-[0.4em] uppercase text-white/60 font-bold\">
                  {String(CATEGORIES.indexOf(cat.name) + 1).padStart(2, \"0\")}
                </div>
                <div className=\"flex items-end justify-between\">
                  <span className=\"font-heading text-3xl sm:text-4xl uppercase tracking-tight text-white\">
                    {cat.name}
                  </span>
                  <ArrowRight className=\"text-[#FF3B30] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all\" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className=\"border-t border-white/10 bg-[#0A0A0A]\">
          <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28\">
            <div className=\"flex items-end justify-between mb-12\">
              <div>
                <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-3\">
                  02 · Featured
                </div>
                <h2 className=\"font-heading text-4xl sm:text-5xl uppercase tracking-tight leading-none text-white\">
                  Fresh on the floor
                </h2>
              </div>
              <Link
                to=\"/shop\"
                data-testid=\"featured-view-all\"
                className=\"hidden sm:inline text-xs font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-[#FF3B30] transition-colors\"
              >
                Browse all →
              </Link>
            </div>
            <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6\" data-testid=\"featured-grid\">
              {featured.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WELCOME / CTA STRIP */}
      <section className=\"relative border-t border-white/10\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-center\">
          <div className=\"md:col-span-7\">
            <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-3\">
              03 · Welcome
            </div>
            <h2 className=\"font-heading text-4xl sm:text-5xl uppercase tracking-tight leading-none text-white mb-6\">
              Built for athletes. <br />Run by enthusiasts.
            </h2>
            <p className=\"text-gray-400 leading-relaxed max-w-2xl\">
              From your child's first cricket bat to a tournament-grade volleyball net,
              Kiran Sports has stocked the gear that fuels Dharwad's sporting community
              for years. Walk in, and you'll find genuine products, fair prices, and a
              team that actually plays the games.
            </p>
            <Link
              to=\"/about\"
              data-testid=\"home-about-cta\"
              className=\"inline-flex items-center gap-3 mt-8 text-sm font-bold uppercase tracking-[0.3em] text-white hover:text-[#FF3B30] transition-colors\"
            >
              Read our story <ArrowRight size={16} />
            </Link>
          </div>
          <div className=\"md:col-span-5\">
            <div className=\"bg-[#141414] border border-white/10 p-8\">
              <div className=\"text-[10px] tracking-[0.4em] uppercase text-[#FF3B30] mb-4\">Visit the store</div>
              <div className=\"font-heading text-2xl uppercase text-white leading-tight mb-4\">
                Civil Hospital Road,<br />Haliyal Naka, Dharwad
              </div>
              <div className=\"text-sm text-gray-400 leading-relaxed mb-6\">{SHOP.hours}</div>
              <a
                href={`tel:${SHOP.phone}`}
                data-testid=\"home-call-button\"
                className=\"block w-full bg-[#FF3B30] text-white font-bold uppercase tracking-[0.25em] text-sm py-4 text-center hover:bg-[#D62828] transition-colors\"
              >
                Call {SHOP.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
"
