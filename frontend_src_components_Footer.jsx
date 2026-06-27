"import { Link } from \"react-router-dom\";
import { Phone, MapPin, Clock } from \"lucide-react\";
import { SHOP } from \"../lib/api\";

export default function Footer() {
  return (
    <footer data-testid=\"site-footer\" className=\"border-t border-white/10 bg-[#0A0A0A]\">
      <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10\">
        <div className=\"md:col-span-2\">
          <div className=\"font-heading text-3xl tracking-wider text-white\">
            KIRAN<span className=\"text-[#FF3B30]\">.</span>SPORTS
          </div>
          <div className=\"mt-1 text-[11px] tracking-[0.3em] text-white/40 uppercase\">
            {SHOP.kannada} · Est. Dharwad
          </div>
          <p className=\"mt-5 text-sm text-gray-400 max-w-md leading-relaxed\">
            One-stop destination for cricket, football, tennis, basketball & volleyball
            gear. Trusted by athletes across North Karnataka for over a decade.
          </p>
        </div>

        <div>
          <div className=\"font-heading text-sm tracking-[0.3em] text-white uppercase mb-4\">
            Visit
          </div>
          <ul className=\"space-y-3 text-sm text-gray-400\">
            <li className=\"flex gap-3\"><MapPin size={16} className=\"shrink-0 mt-0.5 text-[#FF3B30]\" /><span>{SHOP.address}</span></li>
            <li className=\"flex gap-3\"><Clock size={16} className=\"shrink-0 mt-0.5 text-[#FF3B30]\" /><span>{SHOP.hours}</span></li>
            <li className=\"flex gap-3\"><Phone size={16} className=\"shrink-0 mt-0.5 text-[#FF3B30]\" /><a href={`tel:${SHOP.phone}`} className=\"hover:text-white\" data-testid=\"footer-phone\">{SHOP.phone}</a></li>
          </ul>
        </div>

        <div>
          <div className=\"font-heading text-sm tracking-[0.3em] text-white uppercase mb-4\">
            Explore
          </div>
          <ul className=\"space-y-3 text-sm text-gray-400\">
            <li><Link to=\"/shop\" className=\"hover:text-white\" data-testid=\"footer-link-shop\">Shop</Link></li>
            <li><Link to=\"/about\" className=\"hover:text-white\" data-testid=\"footer-link-about\">About</Link></li>
            <li><Link to=\"/contact\" className=\"hover:text-white\" data-testid=\"footer-link-contact\">Contact</Link></li>
            <li><Link to=\"/admin\" className=\"hover:text-white\" data-testid=\"footer-link-admin\">Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className=\"border-t border-white/10\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row justify-between text-xs text-gray-500 uppercase tracking-widest gap-2\">
          <span>© {new Date().getFullYear()} Kiran Sports. All rights reserved.</span>
          <span>F265+FP Dharwad, Karnataka</span>
        </div>
      </div>
    </footer>
  );
}
"
