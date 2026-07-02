"import { MapPin, Clock, Phone, Award, Users, Calendar } from \"lucide-react\";
import { ABOUT_IMAGE, SHOP } from \"../lib/api\";

export default function About() {
  return (
    <div data-testid=\"about-page\">
      {/* HEADER */}
      <section className=\"pt-32 pb-12 border-b border-white/10\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8\">
          <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-4\">
            About · {SHOP.kannada}
          </div>
          <h1 className=\"font-heading text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.9] text-white max-w-4xl\">
            A neighborhood store with a <span className=\"text-[#FF3B30]\">tournament-grade</span> shelf.
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section className=\"max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-12 gap-12\">
        <div className=\"md:col-span-7 space-y-6 text-gray-300 leading-relaxed\">
          <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold\">01 · Our Story</div>
          <p className=\"text-lg\">
            Kiran Sports started on a single principle — a sporting goods store should
            be run by people who actually play. Tucked away on Civil Hospital Road in
            Dharwad, our shop has grown into one of North Karnataka's most reliable
            destinations for authentic sports gear.
          </p>
          <p>
            From village school cricketers buying their first bat, to college teams
            outfitting an entire squad, we've quietly become part of the rhythm of
            sport in the region. Across <span className=\"text-white font-semibold\">815+ Google
            reviews</span>, the same words keep showing up: <em className=\"text-white\">variety</em>,
            <em className=\"text-white\"> friendly staff</em>, <em className=\"text-white\">best prices</em>.
          </p>
          <p>
            We don't chase trends. We stock what serious athletes need — Kookaburra,
            SG, SS, Nivia, Yonex, Spalding, Mikasa — and we make sure it's real, fairly
            priced, and ready to play.
          </p>
        </div>

        <div className=\"md:col-span-5\">
          <div className=\"aspect-[4/5] relative overflow-hidden border border-white/10\">
            <img src={ABOUT_IMAGE} alt=\"Inside Kiran Sports\" className=\"absolute inset-0 w-full h-full object-cover\" />
            <div className=\"absolute inset-0 bg-gradient-to-t from-black/80 to-transparent\" />
            <div className=\"absolute bottom-0 left-0 right-0 p-6\">
              <div className=\"text-[10px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-2\">The Store</div>
              <div className=\"font-heading text-2xl uppercase text-white\">Dharwad · Karnataka</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className=\"border-y border-white/10 bg-[#141414]\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8\">
          {[
            { icon: Calendar, k: \"10+\", v: \"Years serving Dharwad\" },
            { icon: Users, k: \"815+\", v: \"Google reviews\" },
            { icon: Award, k: \"3.6★\", v: \"Customer rating\" },
            { icon: Users, k: \"5\", v: \"Sport categories\" },
          ].map((s, i) => (
            <div key={i} className=\"flex flex-col gap-3\">
              <s.icon className=\"text-[#FF3B30]\" size={24} strokeWidth={1.5} />
              <div className=\"font-heading text-5xl text-white\">{s.k}</div>
              <div className=\"text-xs uppercase tracking-[0.25em] text-gray-400\">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION & HOURS */}
      <section className=\"max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28\">
        <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-3\">02 · Find us</div>
        <h2 className=\"font-heading text-4xl sm:text-5xl uppercase tracking-tight leading-none text-white mb-12\">
          Location & hours
        </h2>
        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
          <div className=\"bg-[#141414] border border-white/10 p-8\">
            <MapPin className=\"text-[#FF3B30] mb-4\" size={28} strokeWidth={1.5} />
            <div className=\"font-heading text-xl uppercase text-white mb-3\">Address</div>
            <div className=\"text-sm text-gray-400 leading-relaxed\">{SHOP.address}</div>
          </div>
          <div className=\"bg-[#141414] border border-white/10 p-8\">
            <Clock className=\"text-[#FF3B30] mb-4\" size={28} strokeWidth={1.5} />
            <div className=\"font-heading text-xl uppercase text-white mb-3\">Working hours</div>
            <div className=\"text-sm text-gray-400 leading-relaxed\">
              Monday – Saturday<br />11:00 AM – 9:00 PM<br />Sunday: Closed
            </div>
          </div>
          <div className=\"bg-[#141414] border border-white/10 p-8\">
            <Phone className=\"text-[#FF3B30] mb-4\" size={28} strokeWidth={1.5} />
            <div className=\"font-heading text-xl uppercase text-white mb-3\">Contact</div>
            <a href={`tel:${SHOP.phone}`} className=\"text-sm text-gray-400 hover:text-white block\" data-testid=\"about-phone\">
              {SHOP.phone}
            </a>
            <a href={`https://wa.me/${SHOP.phoneIntl}`} target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-sm text-[#25D366] hover:text-white block mt-2\">
              WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className=\"border-t border-white/10 bg-[#0A0A0A]\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28\">
          <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-3\">03 · The team</div>
          <h2 className=\"font-heading text-4xl sm:text-5xl uppercase tracking-tight leading-none text-white mb-4\">
            People behind the counter
          </h2>
          <p className=\"text-gray-400 max-w-2xl mb-12\">
            A small, dedicated crew who know the difference between a tennis ball
            stitched for hard courts and one made for clay.
          </p>
          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
            {[
              { name: \"Kiran\", role: \"Founder · Owner\", initials: \"K\" },
              { name: \"The Floor Team\", role: \"Product Specialists\", initials: \"FT\" },
              { name: \"Service Desk\", role: \"Orders & Enquiries\", initials: \"SD\" },
            ].map((m, i) => (
              <div key={i} className=\"bg-[#141414] border border-white/10 p-8 flex flex-col items-start gap-5\">
                <div className=\"w-20 h-20 bg-[#FF3B30] flex items-center justify-center font-heading text-3xl text-white\">
                  {m.initials}
                </div>
                <div>
                  <div className=\"font-heading text-2xl uppercase text-white\">{m.name}</div>
                  <div className=\"text-xs uppercase tracking-[0.25em] text-gray-400 mt-1\">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
"
