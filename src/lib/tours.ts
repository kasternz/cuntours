export type Category = "acuatico" | "arqueologico";

export type LastMinute = {
  seats: number;
  discountPct: number;
  departs: "hoy" | "manana";
};

export type Tour = {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  duration: string;
  location: string;
  meeting: string;
  includes: string[];
  notIncluded: string[];
  highlights: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  lastMinute?: LastMinute;
  groupSize: string;
  languages: string;
};

export const tours: Tour[] = [
  {
    slug: "catamaran-isla-mujeres",
    name: "Catamarán a Isla Mujeres",
    category: "acuatico",
    tagline: "Vela, snorkel y playa en un solo día",
    description:
      "Zarpe desde Cancún en un catamarán de cubierta abierta. Snorkel en el arrecife, open bar tropical y tiempo libre en Playa Norte, una de las bahías más calmadas del Caribe. Guía bilingüe y toallas a bordo.",
    duration: "7 horas",
    location: "Cancún · Isla Mujeres",
    meeting: "Recogida en hotel zona hotelera y downtown",
    includes: [
      "Traslado ida y vuelta desde el hotel",
      "Snorkel con equipo",
      "Open bar nacional",
      "Buffet ligero a bordo",
      "Tiempo libre en Playa Norte",
    ],
    notIncluded: ["Propinas", "Fotos profesionales", "Impuesto de muelle (aprox. $12 USD)"],
    highlights: ["Arrecife El Meco", "Playa Norte", "Barra libre"],
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    reviewCount: 1842,
    image: "/images/catamaran-isla.jpg",
    lastMinute: { seats: 6, discountPct: 31, departs: "hoy" },
    groupSize: "Hasta 40",
    languages: "Español e inglés",
  },
  {
    slug: "snorkel-arrecife-cancun",
    name: "Snorkel en el arrecife de Cancún",
    category: "acuatico",
    tagline: "Parque Marino Nacional, agua cristalina",
    description:
      "Salida temprana hacia el Parque Marino. Dos paradas de snorkel sobre coral de cerebro y abanicos, con pez ángel, loro y a veces rayas. Grupos reducidos y briefing de conservación.",
    duration: "4 horas",
    location: "Punta Nizuc · Cancún",
    meeting: "Muelle Punta Nizuc, traslado opcional",
    includes: [
      "Lancha exclusiva de grupo pequeño",
      "Equipo de snorkel y chaleco",
      "Guía certificado",
      "Agua y fruta",
      "Seguro de viajero",
    ],
    notIncluded: ["Fotos", "Propinas", "Parque marino si aplica"],
    highlights: ["Dos arrecifes", "Grupo pequeño", "Salida matutina"],
    price: 59,
    rating: 4.7,
    reviewCount: 963,
    image: "/images/snorkel-arrecife.jpg",
    groupSize: "Hasta 12",
    languages: "Español e inglés",
  },
  {
    slug: "tiburon-ballena",
    name: "Nado con tiburón ballena",
    category: "acuatico",
    tagline: "El pez más grande del planeta, a tu lado",
    description:
      "Temporada de junio a septiembre. Navegación hacia Isla Contoy / Isla Mujeres para nadar junto a tiburones ballena en su ruta de alimentación. Solo se permite un número limitado de nadadores por animal.",
    duration: "8 horas",
    location: "Isla Mujeres · mar abierto",
    meeting: "Recogida en hotel 6:30–7:00",
    includes: [
      "Traslado hotel",
      "Desayuno ligero y almuerzo",
      "Equipo de snorkel",
      "Permiso de avistamiento",
      "Guía marino",
    ],
    notIncluded: ["Propinas", "Toalla personal"],
    highlights: ["Encuentro silvestre", "Isla Contoy", "Grupo regulado"],
    price: 159,
    originalPrice: 189,
    rating: 4.9,
    reviewCount: 721,
    image: "/images/tiburon-ballena.jpg",
    groupSize: "Hasta 18",
    languages: "Español e inglés",
  },
  {
    slug: "cenotes-sagrados",
    name: "Cenotes sagrados",
    category: "acuatico",
    tagline: "Agua esmeralda bajo la selva maya",
    description:
      "Tres cenotes de la riviera: uno abierto, uno semi-abierto y una caverna con estalactitas. Casco, chaleco y guía espeleólogo. Ideal si quieres agua dulce y sombra lejos de la playa.",
    duration: "6 horas",
    location: "Ruta de los Cenotes · Puerto Morelos",
    meeting: "Recogida en hotel Cancún o Playa del Carmen",
    includes: [
      "Traslado",
      "Entrada a tres cenotes",
      "Equipo de snorkel y casco",
      "Almuerzo regional",
      "Regaderas y lockers",
    ],
    notIncluded: ["Fotos", "Propinas"],
    highlights: ["Caverna iluminada", "Almuerzo maya", "Poca gente"],
    price: 79,
    rating: 4.8,
    reviewCount: 1104,
    image: "/images/cenotes.jpg",
    groupSize: "Hasta 16",
    languages: "Español, inglés y francés",
  },
  {
    slug: "cozumel-palancar",
    name: "Cozumel: arrecife Palancar",
    category: "acuatico",
    tagline: "El arrecife más claro del Caribe mexicano",
    description:
      "Ferry a Cozumel y dos inmersiones de snorkel o bautizo de buceo en Palancar Gardens. Corriente suave, visibilidad de 30 metros y pared de coral. Incluye almuerzo en la isla.",
    duration: "9 horas",
    location: "Cozumel",
    meeting: "Ferry Playa del Carmen, traslado desde Cancún",
    includes: [
      "Traslado Cancún–Playa",
      "Ferry ida y vuelta",
      "Dos sitios de arrecife",
      "Equipo completo",
      "Almuerzo en muelle",
    ],
    notIncluded: ["Propinas de tripulación", "Nitrox"],
    highlights: ["Visibilidad extrema", "Palancar", "Día completo"],
    price: 129,
    rating: 4.8,
    reviewCount: 588,
    image: "/images/cozumel.jpg",
    groupSize: "Hasta 20",
    languages: "Español e inglés",
  },
  {
    slug: "chichen-itza-amanecer",
    name: "Chichén Itzá al amanecer",
    category: "arqueologico",
    tagline: "El Castillo sin filas, con luz dorada",
    description:
      "Salida de madrugada para entrar con el primer grupo. Recorrido de 2 horas con arqueólogo: El Castillo, el Juego de Pelota, el Observatorio y el Cenote Sagrado. Almuerzo yucateco y parada en cenote para nadar de regreso.",
    duration: "12 horas",
    location: "Chichén Itzá · Yucatán",
    meeting: "Recogida 5:30–6:00 en hotel",
    includes: [
      "Traslado en van climatizada",
      "Entrada a la zona arqueológica",
      "Guía arqueólogo certificado",
      "Almuerzo buffet",
      "Parada en cenote",
    ],
    notIncluded: ["Propinas", "Video oficial INAH", "Souvenirs"],
    highlights: ["Acceso temprano", "Guía arqueólogo", "Cenote de regreso"],
    price: 99,
    originalPrice: 139,
    rating: 4.9,
    reviewCount: 2310,
    image: "/images/chichen-itza.jpg",
    lastMinute: { seats: 4, discountPct: 29, departs: "hoy" },
    groupSize: "Hasta 14",
    languages: "Español e inglés",
  },
  {
    slug: "tulum-playa",
    name: "Tulum ruinas y playa",
    category: "arqueologico",
    tagline: "Templo sobre el acantilado, luego el mar",
    description:
      "Recorrido por la zona amurallada de Tulum con historiador: El Castillo, el Templo de los Frescos y vistas al Caribe. Después, tiempo libre en la playa de arena blanca bajo las ruinas. Grupos de mañana para evitar el calor pico.",
    duration: "7 horas",
    location: "Tulum",
    meeting: "Recogida en hotel Cancún / Riviera Maya",
    includes: [
      "Traslado",
      "Entrada a ruinas",
      "Guía historiador",
      "Tiempo de playa",
      "Agua y refrigerio",
    ],
    notIncluded: ["Almuerzo", "Sombrilla de playa", "Propinas"],
    highlights: ["Acantilado Caribe", "Playa privada del sitio", "Grupo matutino"],
    price: 69,
    rating: 4.7,
    reviewCount: 1566,
    image: "/images/tulum.jpg",
    groupSize: "Hasta 18",
    languages: "Español e inglés",
  },
  {
    slug: "coba-selva",
    name: "Cobá y selva",
    category: "arqueologico",
    tagline: "Pirámide en la selva y lagunas mayas",
    description:
      "Cobá se recorre en bici entre sacbés (calzadas blancas). Subida opcional a Nohoch Mul, la pirámide más alta de Quintana Roo. Después, almuerzo en pueblo maya y nado en un cenote de caverna.",
    duration: "10 horas",
    location: "Cobá · Quintana Roo",
    meeting: "Recogida en hotel",
    includes: [
      "Traslado",
      "Bicicleta en el sitio",
      "Entrada a Cobá",
      "Guía local",
      "Almuerzo y cenote",
    ],
    notIncluded: ["Propinas", "Lockers extra"],
    highlights: ["Nohoch Mul", "Bici en la selva", "Pueblo maya"],
    price: 89,
    rating: 4.8,
    reviewCount: 874,
    image: "/images/coba.jpg",
    groupSize: "Hasta 16",
    languages: "Español e inglés",
  },
  {
    slug: "ek-balam-cenote",
    name: "Ek Balam y cenote",
    category: "arqueologico",
    tagline: "Estuco maya intacto y agua de caverna",
    description:
      "Ek Balam guarda uno de los frisos de estuco mejor conservados del mundo maya. Recorrido con epigrafista, subida a la Acrópolis y nado en un cenote cercano de agua turquesa. Menos visitado que Chichén: luz y silencio.",
    duration: "11 horas",
    location: "Ek Balam · Yucatán",
    meeting: "Recogida 6:00 en hotel Cancún",
    includes: [
      "Traslado",
      "Entrada a Ek Balam",
      "Guía epigrafista",
      "Cenote y almuerzo",
      "Agua todo el día",
    ],
    notIncluded: ["Propinas", "Tirolina opcional"],
    highlights: ["Friso del jaguar", "Poca afluencia", "Cenote privado"],
    price: 85,
    originalPrice: 109,
    rating: 4.9,
    reviewCount: 412,
    image: "/images/ek-balam.jpg",
    lastMinute: { seats: 8, discountPct: 22, departs: "manana" },
    groupSize: "Hasta 12",
    languages: "Español e inglés",
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function lastMinuteTours() {
  return tours.filter((t) => t.lastMinute);
}

export function toursByCategory(category: Category) {
  return tours.filter((t) => t.category === category);
}

export function relatedTours(slug: string, limit = 3) {
  const current = getTour(slug);
  if (!current) return tours.slice(0, limit);
  return tours
    .filter((t) => t.slug !== slug)
    .sort((a, b) => {
      const same = Number(b.category === current.category) - Number(a.category === current.category);
      if (same !== 0) return same;
      return b.rating - a.rating;
    })
    .slice(0, limit);
}

export function tourPrice(tour: Tour, adults: number, children: number) {
  const childRate = 0.6;
  return tour.price * adults + Math.round(tour.price * childRate) * children;
}

export function totalReviewCount() {
  return tours.reduce((acc, t) => acc + t.reviewCount, 0);
}

export function categoryLabel(category: Category) {
  return category === "acuatico" ? "Acuático" : "Arqueológico";
}
