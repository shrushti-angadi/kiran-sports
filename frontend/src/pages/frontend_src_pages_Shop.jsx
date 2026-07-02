"import { useEffect, useState } from \"react\";
import { useSearchParams } from \"react-router-dom\";
import { Search } from \"lucide-react\";
import { api, CATEGORIES } from \"../lib/api\";
import ProductCard from \"../components/ProductCard\";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get(\"category\") || \"All\";
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(initialCat);
  const [query, setQuery] = useState(\"\");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = category === \"All\" ? {} : { category };
    api
      .get(\"/products\", { params })
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    if (category === \"All\") {
      searchParams.delete(\"category\");
    } else {
      searchParams.set(\"category\", category);
    }
    setSearchParams(searchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const tabs = [\"All\", ...CATEGORIES];

  return (
    <div data-testid=\"shop-page\" className=\"pt-24\">
      {/* HEADER */}
      <section className=\"border-b border-white/10\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8 py-12\">
          <div className=\"text-[11px] tracking-[0.4em] uppercase text-[#FF3B30] font-bold mb-4\">
            Catalog
          </div>
          <div className=\"flex flex-col md:flex-row md:items-end justify-between gap-6\">
            <h1 className=\"font-heading text-5xl sm:text-6xl uppercase tracking-tight leading-none text-white\">
              Shop the floor
            </h1>
            <div className=\"relative max-w-sm w-full\">
              <Search className=\"absolute left-4 top-1/2 -translate-y-1/2 text-gray-500\" size={16} />
              <input
                type=\"text\"
                data-testid=\"shop-search-input\"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder=\"Search products...\"
                className=\"w-full bg-[#141414] border border-white/10 focus:border-[#FF3B30] outline-none text-white text-sm pl-11 pr-4 py-3 uppercase tracking-wider placeholder:text-gray-600 placeholder:normal-case placeholder:tracking-normal\"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className=\"border-b border-white/10 bg-[#0A0A0A] sticky top-16 z-30 backdrop-blur-xl bg-black/80\">
        <div className=\"max-w-7xl mx-auto px-6 sm:px-8\">
          <div className=\"flex gap-1 overflow-x-auto no-scrollbar py-4\">
            {tabs.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                data-testid={`shop-filter-${c.toLowerCase()}`}
                className={`shrink-0 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.25em] transition-all border ${
                  category === c
                    ? \"bg-[#FF3B30] border-[#FF3B30] text-white\"
                    : \"bg-transparent border-white/15 text-gray-400 hover:border-white hover:text-white\"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className=\"max-w-7xl mx-auto px-6 sm:px-8 py-12 min-h-[60vh]\">
        {loading ? (
          <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6\">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className=\"bg-[#141414] border border-white/5 aspect-[4/5] animate-pulse\" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div data-testid=\"shop-empty\" className=\"py-24 text-center\">
            <div className=\"font-heading text-3xl uppercase text-white mb-3\">No products found</div>
            <div className=\"text-sm text-gray-500 uppercase tracking-widest\">
              Try a different category or search
            </div>
          </div>
        ) : (
          <>
            <div className=\"flex justify-between items-center mb-6 text-xs uppercase tracking-[0.3em] text-gray-500\">
              <span data-testid=\"shop-result-count\">{filtered.length} item{filtered.length !== 1 ? \"s\" : \"\"}</span>
              <span>{category}</span>
            </div>
            <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6\" data-testid=\"shop-product-grid\">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
"
