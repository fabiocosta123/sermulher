// types/product.ts ou direto no mock
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  color: string; // Hexadecimal para o batom/tinta
  subtone: 'frio' | 'quente' | 'neutro';
  category: 'Batons' | 'Tinturas';
  image: string;
}

export const PRODUCT_MOCK: Product[] = [
  // BATONS - SUBTOM FRIO
  {
    id: "b1",
    name: "Batom Matte Velvet Amora",
    brand: "Ser Mulher",
    price: 49.90,
    color: "#701a2d", // Vinho/Amora
    subtone: "frio",
    category: "Batons",
    image: "/products/batom-amora.jpg"
  },
  {
    id: "b2",
    name: "Rosa Quartz Soft",
    brand: "Ser Mulher",
    price: 35.00,
    color: "#d4a5a5", // Rosa Frio
    subtone: "frio",
    category: "Batons",
    image: "/products/rosa-quartz.jpg"
  },
  // BATONS - SUBTOM QUENTE
  {
    id: "b3",
    name: "Terracota Sunset",
    brand: "Ser Mulher",
    price: 42.00,
    color: "#a34d31", // Alaranjado/Terra
    subtone: "quente",
    category: "Batons",
    image: "/products/terracota.jpg"
  },
  // TINTURAS
  {
    id: "t1",
    name: "Louro Platinado Gelo",
    brand: "Fluxus Hair",
    price: 89.00,
    color: "#e5e7eb", 
    subtone: "frio",
    category: "Tinturas",
    image: "/products/platinado.jpg"
  },
  {
    id: "t2",
    name: "Chocolate Dourado",
    brand: "Fluxus Hair",
    price: 75.00,
    color: "#4b2c20",
    subtone: "quente",
    category: "Tinturas",
    image: "/products/chocolate.jpg"
  }
];