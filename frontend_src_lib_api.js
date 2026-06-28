"import axios from \"axios\";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(\"kiran_admin_token\");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const SHOP = {
  name: \"Kiran Sports\",
  kannada: \"ಕಿರಣ್ ಸ್ಪೋರ್ಟ್ಸ್\",
  tagline: \"Elite Sporting Goods · Dharwad\",
  phone: \"094483 60908\",
  phoneIntl: \"919448360908\",
  address: \"1st Floor, LEA Complex, Civil Hospital Road, beside RLS School, Dharwad, Hubballi, Karnataka 580001\",
  hours: \"Mon – Sat · 10:30 AM – 8:00 PM\",
  mapsEmbed: \"https://www.google.com/maps?q=Kiran+Sports+Dharwad+Karnataka&output=embed\",
  mapsLink: \"https://maps.google.com/?q=Kiran+Sports+Dharwad+Karnataka\",
};

export const CATEGORIES = [\"Cricket\", \"Football\", \"Tennis\", \"Basketball\", \"Volleyball\"];

export const CATEGORY_IMAGES = {
  Cricket: \"https://images.unsplash.com/photo-1531415074968-036ba1b575da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwYmF0fGVufDB8fHx8MTc4MjUxNjU5Nnww&ixlib=rb-4.1.0&q=85\",
  Football: \"https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxmb290YmFsbCUyMHRlbm5pcyUyMHNwb3J0cyUyMGVxdWlwbWVudHxlbnwwfHx8fDE3ODI1MTY1ODZ8MA&ixlib=rb-4.1.0&q=85\",
  Tennis: \"https://images.unsplash.com/photo-1627314387807-df615e8567de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHRlbm5pcyUyMHNwb3J0cyUyMGVxdWlwbWVudHxlbnwwfHx8fDE3ODI1MTY1ODZ8MA&ixlib=rb-4.1.0&q=85\",
  Basketball: \"https://images.unsplash.com/photo-1627627256672-027a4613d028?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwZGFya3xlbnwwfHx8fDE3ODI1MTY1OTZ8MA&ixlib=rb-4.1.0&q=85\",
  Volleyball: \"https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsfGVufDB8fHx8MTc4MjUxNjU5N3ww&ixlib=rb-4.1.0&q=85\",
};

export const HERO_IMAGE = \"https://images.pexels.com/photos/35801173/pexels-photo-35801173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940\";
export const ABOUT_IMAGE = \"https://images.unsplash.com/photo-1590227632180-80a3bf110871?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHxiYXNrZXRiYWxsJTIwZGFya3xlbnwwfHx8fDE3ODI1MTY1OTZ8MA&ixlib=rb-4.1.0&q=85\";

export const formatPrice = (n) => {
  const num = Number(n) || 0;
  return `₹${num.toLocaleString(\"en-IN\")}`;
};
"
