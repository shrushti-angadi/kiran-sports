"import { SHOP } from \"../lib/api\";

export default function WhatsAppButton() {
  const url = `https://wa.me/${SHOP.phoneIntl}?text=Hi%20Kiran%20Sports%2C%20I%27d%20like%20to%20enquire%20about`;
  return (
    <a
      data-testid=\"whatsapp-float-button\"
      href={url}
      target=\"_blank\"
      rel=\"noopener noreferrer\"
      className=\"fixed bottom-6 right-6 z-40 group flex items-center gap-3\"
      aria-label=\"Chat on WhatsApp\"
    >
      <span className=\"hidden group-hover:inline-block bg-white text-black text-xs font-bold uppercase tracking-widest px-3 py-2\">
        Chat on WhatsApp
      </span>
      <span className=\"w-14 h-14 bg-[#25D366] flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform\">
        <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"white\">
          <path d=\"M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.47 0 .12 5.34.12 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.27-1.64a11.94 11.94 0 0 0 5.78 1.47h.01c6.59 0 11.94-5.34 11.94-11.93 0-3.19-1.24-6.18-3.48-8.42zM12.06 21.8c-1.78 0-3.52-.48-5.03-1.39l-.36-.21-3.72.97 1-3.62-.23-.37a9.85 9.85 0 0 1-1.52-5.25c0-5.47 4.46-9.92 9.94-9.92 2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.9 7.02c0 5.47-4.46 9.86-9.99 9.86zm5.45-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9.04 9.04 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.17 5.02 4.45.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.77-.72 2.02-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z\" />
        </svg>
      </span>
    </a>
  );
}
"
