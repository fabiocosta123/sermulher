// types/product.ts
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  color: string;
  subtone: 'frio' | 'quente' | 'neutro';
  category: 'Batons' | 'Tinturas' | 'Blush' | 'Base';
  image: string;
  quantity?: number
}

export interface CartItem extends Product { quantity: number; }

export const PRODUCT_MOCK: Product[] = [
  // --- BATONS (Manutenção das cores originais com foco em subtons) ---
  {
    id: "b1",
    name: "Batom Matte Velvet Amora",
    brand: "Ser Mulher",
    price: 49.90,
    color: "#701a2d",
    subtone: "frio",
    category: "Batons",
    image: "/products/batom-amora.jpg"
  },
  {
    id: "b2",
    name: "Rosa Quartz Soft",
    brand: "Ser Mulher",
    price: 35.00,
    color: "#d4a5a5",
    subtone: "frio",
    category: "Batons",
    image: "/products/rosa-quartz.jpg"
  },
  {
    id: "b3",
    name: "Terracota Sunset",
    brand: "Ser Mulher",
    price: 42.00,
    color: "#a34d31",
    subtone: "quente",
    category: "Batons",
    image: "/products/terracota.jpg"
  },
  {
    id: "b4",
    name: "Nude Pêssego Warm",
    brand: "Ser Mulher",
    price: 38.00,
    color: "#c78d6c",
    subtone: "quente",
    category: "Batons",
    image: "/products/nude-pessego.jpg"
  },
  {
    id: "b5",
    name: "Vermelho Clássico Universal",
    brand: "Ser Mulher",
    price: 55.00,
    color: "#b91c1c",
    subtone: "neutro",
    category: "Batons",
    image: "/products/vermelho-universal.jpg"
  },
  {
    id: "b6",
    name: "Malva Balance",
    brand: "Ser Mulher",
    price: 44.90,
    color: "#915c6d",
    subtone: "neutro",
    category: "Batons",
    image: "/products/malva-balance.jpg"
  },

  // --- TINTURAS (Cores otimizadas para visibilidade no Swatch/Bolinha) ---
  {
    id: "t1",
    name: "Louro Platinado Gelo",
    brand: "Fluxus Hair",
    price: 89.00,
    color: "#F0F9FF", // Mais brilhante para destacar como platinado frio
    subtone: "frio",
    category: "Tinturas",
    image: "/products/platinado.jpg"
  },
  {
    id: "t2",
    name: "Preto Azulado Profundo",
    brand: "Fluxus Hair",
    price: 65.00,
    color: "#020617", // Um preto quase "espaço" com fundo frio
    subtone: "frio",
    category: "Tinturas",
    image: "/products/preto-azulado.jpg"
  },
  {
    id: "t3",
    name: "Chocolate Dourado",
    brand: "Fluxus Hair",
    price: 75.00,
    color: "#451a03", // Marrom rico e quente
    subtone: "quente",
    category: "Tinturas",
    image: "/products/chocolate.jpg"
  },
  {
    id: "t4",
    name: "Ruivo Acobreado Intenso",
    brand: "Fluxus Hair",
    price: 82.00,
    color: "#ea580c", // Laranja vibrante (vibrante mesmo para se destacar)
    subtone: "quente",
    category: "Tinturas",
    image: "/products/ruivo.jpg"
  },
  {
    id: "t5",
    name: "Castanho Médio Natural",
    brand: "Fluxus Hair",
    price: 68.00,
    color: "#271c19", // Neutro sólido
    subtone: "neutro",
    category: "Tinturas",
    image: "/products/castanho-natural.jpg"
  },

  // --- BLUSH (Cores de alto contraste) ---
  {
    id: "bl1",
    name: "Blush Rosé Cool",
    brand: "Daju Beauty",
    price: 29.90,
    color: "#ec4899",
    subtone: "frio",
    category: "Blush",
    image: "/products/blush-rose.jpg"
  },
  {
    id: "bl2",
    name: "Blush Coral Sun",
    brand: "Daju Beauty",
    price: 29.90,
    color: "#f97316", 
    subtone: "quente",
    category: "Blush",
    image: "/products/blush-coral.jpg"
  }
];