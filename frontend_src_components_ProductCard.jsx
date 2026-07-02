"import { CATEGORY_IMAGES, formatPrice } from \"../lib/api\";

export default function ProductCard({ product }) {
  const fallback = CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES.Cricket;
  const src = product.image_url && product.image_url.trim() ? product.image_url : fallback;

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className=\"group relative flex flex-col bg-[#141414] border border-white/5 hover:border-[#FF3B30]/60 transition-all duration-300\"
    >
      <div className=\"relative aspect-[4/5] overflow-hidden bg-[#1A1A1A]\">
        <img
          src={src}
          alt={product.name}
          className=\"object-cover w-full h-full group-hover:scale-105 transition-transform duration-700\"
          onError={(e) => { e.currentTarget.src = fallback; }}
        />
        <div className=\"absolute top-3 left-3 bg-black/80 px-2 py-1 text-[10px] tracking-[0.25em] uppercase text-white\">
          {product.category}
        </div>
        {!product.in_stock && (
          <div className=\"absolute top-3 right-3 bg-[#FF3B30] px-2 py-1 text-[10px] tracking-[0.25em] uppercase text-white\">
            Sold out
          </div>
        )}
      </div>
      <div className=\"p-5 flex flex-col gap-2 flex-1\">
        <div className=\"font-heading text-xl text-white uppercase line-clamp-2 leading-tight\">
          {product.name}
        </div>
        {product.description && (
          <p className=\"text-xs text-gray-400 line-clamp-2 leading-relaxed\">{product.description}</p>
        )}
        <div className=\"mt-auto pt-3 flex items-baseline justify-between\">
          <span className=\"font-mono text-[#FF3B30] text-lg font-bold\" data-testid={`product-price-${product.id}`}>
            {formatPrice(product.price)}
          </span>
          <span className=\"text-[10px] tracking-[0.3em] uppercase text-white/40\">In store</span>
        </div>
      </div>
    </div>
  );
}
"
