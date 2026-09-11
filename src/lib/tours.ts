import type { Lang } from "@/i18n/copy";

export type Category = "acuatico" | "arqueologico";
export type Localized = { es: string; en: string };

export type LastMinute = {
  seats: number;
  discountPct: number;
  departs: "hoy" | "manana";
};

export type TourStop = {
  name: Localized;
  description: Localized;
};

export type PrivateOptions = {
  /** Per-person price for a private booking — usually higher than shared. */
  pricePerPerson: number;
  /** Full unit size (van or boat) this tour normally runs with. */
  unitCapacity: number;
  /** Minimum person count charged for, even if fewer people book. */
  minGuaranteePeople: number;
  /** Minimum total amount charged, even if the per-person math is lower. */
  minGuaranteeAmount: number;
  /** Extra charge (0–1) applied on top when the group doesn't fill the unit. */
  underfillSurchargePct: number;
  /** Minimum advance notice required, in days. */
  minAdvanceDays: number;
};

export type Tour = {
  slug: string;
  name: Localized;
  category: Category;
  tagline: Localized;
  description: Localized;
  duration: Localized;
  location: Localized;
  meeting: Localized;
  // Plain-text place search used for the embedded Google Map (no need for
  // precise lat/lng — Maps Embed API geocodes simple queries like this).
  meetingQuery: string;
  stops: TourStop[];
  private: PrivateOptions;
  includes: Localized[];
  notIncluded: Localized[];
  highlights: Localized[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  lastMinute?: LastMinute;
  groupSize: Localized;
  languages: Localized;
};

export const tours: Tour[] = [
  {
    slug: "catamaran-isla-mujeres",
    name: { es: "Catamarán a Isla Mujeres", en: "Isla Mujeres Catamaran" },
    category: "acuatico",
    tagline: {
      es: "Vela, snorkel y playa en un solo día",
      en: "Sailing, snorkeling, and beach in one day",
    },
    description: {
      es: "Zarpe desde Cancún en un catamarán de cubierta abierta. Snorkel en el arrecife, open bar tropical y tiempo libre en Playa Norte, una de las bahías más calmadas del Caribe. Guía bilingüe y toallas a bordo.",
      en: "Set sail from Cancún on an open-deck catamaran. Snorkel the reef, tropical open bar, and free time on Playa Norte, one of the calmest bays in the Caribbean. Bilingual guide and towels on board.",
    },
    duration: { es: "7 horas", en: "7 hours" },
    location: { es: "Cancún · Isla Mujeres", en: "Cancún · Isla Mujeres" },
    meeting: {
      es: "Recogida en hotel zona hotelera y downtown",
      en: "Hotel pickup in the hotel zone and downtown",
    },
    meetingQuery: "Marina El Embarcadero, Cancún, México",
    stops: [
      {
        name: { es: "Salida — Marina El Embarcadero", en: "Departure — Marina El Embarcadero" },
        description: {
          es: "Abordaje y briefing de seguridad antes de zarpar.",
          en: "Boarding and safety briefing before setting sail.",
        },
      },
      {
        name: { es: "Snorkel — arrecife El Meco", en: "Snorkel — El Meco reef" },
        description: {
          es: "Primera parada de snorkel sobre coral y peces tropicales.",
          en: "First snorkel stop over coral and tropical fish.",
        },
      },
      {
        name: { es: "Playa Norte, Isla Mujeres", en: "Playa Norte, Isla Mujeres" },
        description: {
          es: "Tiempo libre en la playa, open bar y buffet a bordo.",
          en: "Free time on the beach, open bar and buffet on board.",
        },
      },
    ],
    private: {
      pricePerPerson: 120,
      unitCapacity: 10,
      minGuaranteePeople: 6,
      minGuaranteeAmount: 720,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 3,
    },
    includes: [
      { es: "Traslado ida y vuelta desde el hotel", en: "Round-trip hotel transfer" },
      { es: "Snorkel con equipo", en: "Snorkeling with gear" },
      { es: "Open bar nacional", en: "Domestic open bar" },
      { es: "Buffet ligero a bordo", en: "Light buffet on board" },
      { es: "Tiempo libre en Playa Norte", en: "Free time on Playa Norte" },
    ],
    notIncluded: [
      { es: "Propinas", en: "Tips" },
      { es: "Fotos profesionales", en: "Professional photos" },
      { es: "Impuesto de muelle (aprox. $12 USD)", en: "Pier tax (approx. $12 USD)" },
    ],
    highlights: [
      { es: "Arrecife El Meco", en: "El Meco reef" },
      { es: "Playa Norte", en: "Playa Norte" },
      { es: "Barra libre", en: "Open bar" },
    ],
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    reviewCount: 1842,
    image: "/images/catamaran-isla.jpg",
    lastMinute: { seats: 6, discountPct: 31, departs: "hoy" },
    groupSize: { es: "Hasta 40", en: "Up to 40" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
  },
  {
    slug: "snorkel-arrecife-cancun",
    name: { es: "Snorkel en el arrecife de Cancún", en: "Cancún Reef Snorkeling" },
    category: "acuatico",
    tagline: {
      es: "Parque Marino Nacional, agua cristalina",
      en: "National Marine Park, crystal-clear water",
    },
    description: {
      es: "Salida temprana hacia el Parque Marino. Dos paradas de snorkel sobre coral de cerebro y abanicos, con pez ángel, loro y a veces rayas. Grupos reducidos y briefing de conservación.",
      en: "Early departure to the Marine Park. Two snorkel stops over brain coral and sea fans, with angelfish, parrotfish, and sometimes rays. Small groups and a conservation briefing.",
    },
    duration: { es: "4 horas", en: "4 hours" },
    location: { es: "Punta Nizuc · Cancún", en: "Punta Nizuc · Cancún" },
    meeting: {
      es: "Muelle Punta Nizuc, traslado opcional",
      en: "Punta Nizuc pier, optional transfer",
    },
    meetingQuery: "Punta Nizuc, Cancún, México",
    stops: [
      {
        name: { es: "Salida — Muelle Punta Nizuc", en: "Departure — Punta Nizuc pier" },
        description: { es: "Equipo de snorkel y briefing.", en: "Snorkel gear and briefing." },
      },
      {
        name: { es: "Primer sitio de arrecife", en: "First reef site" },
        description: {
          es: "Coral de cerebro y abanicos, poca profundidad.",
          en: "Brain coral and sea fans, shallow depth.",
        },
      },
      {
        name: { es: "Segundo sitio de arrecife", en: "Second reef site" },
        description: {
          es: "Zona con más vida marina, peces ángel y loro.",
          en: "Area with more marine life, angelfish and parrotfish.",
        },
      },
    ],
    private: {
      pricePerPerson: 75,
      unitCapacity: 8,
      minGuaranteePeople: 4,
      minGuaranteeAmount: 300,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 2,
    },
    includes: [
      { es: "Lancha exclusiva de grupo pequeño", en: "Exclusive small-group boat" },
      { es: "Equipo de snorkel y chaleco", en: "Snorkel gear and life vest" },
      { es: "Guía certificado", en: "Certified guide" },
      { es: "Agua y fruta", en: "Water and fruit" },
      { es: "Seguro de viajero", en: "Traveler insurance" },
    ],
    notIncluded: [
      { es: "Fotos", en: "Photos" },
      { es: "Propinas", en: "Tips" },
      { es: "Parque marino si aplica", en: "Marine park fee if applicable" },
    ],
    highlights: [
      { es: "Dos arrecifes", en: "Two reefs" },
      { es: "Grupo pequeño", en: "Small group" },
      { es: "Salida matutina", en: "Morning departure" },
    ],
    price: 59,
    rating: 4.7,
    reviewCount: 963,
    image: "/images/snorkel-arrecife.jpg",
    groupSize: { es: "Hasta 12", en: "Up to 12" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
  },
  {
    slug: "tiburon-ballena",
    name: { es: "Nado con tiburón ballena", en: "Whale Shark Swim" },
    category: "acuatico",
    tagline: {
      es: "El pez más grande del planeta, a tu lado",
      en: "The largest fish on the planet, right beside you",
    },
    description: {
      es: "Temporada de junio a septiembre. Navegación hacia Isla Contoy / Isla Mujeres para nadar junto a tiburones ballena en su ruta de alimentación. Solo se permite un número limitado de nadadores por animal.",
      en: "Season runs June to September. Sail out toward Isla Contoy / Isla Mujeres to swim alongside whale sharks on their feeding route. Only a limited number of swimmers are allowed per animal.",
    },
    duration: { es: "8 horas", en: "8 hours" },
    location: { es: "Isla Mujeres · mar abierto", en: "Isla Mujeres · open sea" },
    meeting: { es: "Recogida en hotel 6:30–7:00", en: "Hotel pickup 6:30–7:00 AM" },
    meetingQuery: "Puerto Juárez, Cancún, México",
    stops: [
      {
        name: { es: "Salida — Puerto Juárez", en: "Departure — Puerto Juárez" },
        description: {
          es: "Abordaje y navegación hacia la zona de avistamiento.",
          en: "Boarding and sail out toward the sighting zone.",
        },
      },
      {
        name: { es: "Nado con tiburón ballena", en: "Whale shark swim" },
        description: {
          es: "Grupos pequeños en el agua, turnos regulados por permiso.",
          en: "Small groups in the water, permit-regulated turns.",
        },
      },
      {
        name: { es: "Isla Contoy / Isla Mujeres", en: "Isla Contoy / Isla Mujeres" },
        description: {
          es: "Parada de descanso y almuerzo antes de regresar.",
          en: "Rest and lunch stop before heading back.",
        },
      },
    ],
    private: {
      pricePerPerson: 195,
      unitCapacity: 8,
      minGuaranteePeople: 6,
      minGuaranteeAmount: 1170,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 5,
    },
    includes: [
      { es: "Traslado hotel", en: "Hotel transfer" },
      { es: "Desayuno ligero y almuerzo", en: "Light breakfast and lunch" },
      { es: "Equipo de snorkel", en: "Snorkel gear" },
      { es: "Permiso de avistamiento", en: "Sighting permit" },
      { es: "Guía marino", en: "Marine guide" },
    ],
    notIncluded: [
      { es: "Propinas", en: "Tips" },
      { es: "Toalla personal", en: "Personal towel" },
    ],
    highlights: [
      { es: "Encuentro silvestre", en: "Wildlife encounter" },
      { es: "Isla Contoy", en: "Isla Contoy" },
      { es: "Grupo regulado", en: "Regulated group size" },
    ],
    price: 159,
    originalPrice: 189,
    rating: 4.9,
    reviewCount: 721,
    image: "/images/tiburon-ballena.jpg",
    groupSize: { es: "Hasta 18", en: "Up to 18" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
  },
  {
    slug: "cenotes-sagrados",
    name: { es: "Cenotes sagrados", en: "Sacred Cenotes" },
    category: "acuatico",
    tagline: {
      es: "Agua esmeralda bajo la selva maya",
      en: "Emerald water beneath the Maya jungle",
    },
    description: {
      es: "Tres cenotes de la riviera: uno abierto, uno semi-abierto y una caverna con estalactitas. Casco, chaleco y guía espeleólogo. Ideal si quieres agua dulce y sombra lejos de la playa.",
      en: "Three cenotes of the riviera: one open-air, one semi-open, and a cave with stalactites. Helmet, vest, and a caving guide included. Ideal if you want fresh water and shade away from the beach.",
    },
    duration: { es: "6 horas", en: "6 hours" },
    location: { es: "Ruta de los Cenotes · Puerto Morelos", en: "Cenotes Route · Puerto Morelos" },
    meeting: {
      es: "Recogida en hotel Cancún o Playa del Carmen",
      en: "Hotel pickup in Cancún or Playa del Carmen",
    },
    meetingQuery: "Ruta de los Cenotes, Puerto Morelos, México",
    stops: [
      {
        name: { es: "Cenote abierto", en: "Open-air cenote" },
        description: { es: "Primer nado, agua fresca y luz natural.", en: "First swim, fresh water and natural light." },
      },
      {
        name: { es: "Cenote semi-abierto", en: "Semi-open cenote" },
        description: { es: "Formaciones rocosas parcialmente cubiertas.", en: "Rock formations partially covered." },
      },
      {
        name: { es: "Caverna con estalactitas", en: "Stalactite cave" },
        description: {
          es: "El más dramático de los tres, con casco y guía espeleólogo.",
          en: "The most dramatic of the three, with helmet and caving guide.",
        },
      },
    ],
    private: {
      pricePerPerson: 99,
      unitCapacity: 10,
      minGuaranteePeople: 5,
      minGuaranteeAmount: 495,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 3,
    },
    includes: [
      { es: "Traslado", en: "Transfer" },
      { es: "Entrada a tres cenotes", en: "Entry to three cenotes" },
      { es: "Equipo de snorkel y casco", en: "Snorkel gear and helmet" },
      { es: "Almuerzo regional", en: "Regional lunch" },
      { es: "Regaderas y lockers", en: "Showers and lockers" },
    ],
    notIncluded: [
      { es: "Fotos", en: "Photos" },
      { es: "Propinas", en: "Tips" },
    ],
    highlights: [
      { es: "Caverna iluminada", en: "Lit cave" },
      { es: "Almuerzo maya", en: "Maya lunch" },
      { es: "Poca gente", en: "Few crowds" },
    ],
    price: 79,
    rating: 4.8,
    reviewCount: 1104,
    image: "/images/cenotes.jpg",
    groupSize: { es: "Hasta 16", en: "Up to 16" },
    languages: { es: "Español, inglés y francés", en: "Spanish, English, and French" },
  },
  {
    slug: "cozumel-palancar",
    name: { es: "Cozumel: arrecife Palancar", en: "Cozumel: Palancar Reef" },
    category: "acuatico",
    tagline: {
      es: "El arrecife más claro del Caribe mexicano",
      en: "The clearest reef in the Mexican Caribbean",
    },
    description: {
      es: "Ferry a Cozumel y dos inmersiones de snorkel o bautizo de buceo en Palancar Gardens. Corriente suave, visibilidad de 30 metros y pared de coral. Incluye almuerzo en la isla.",
      en: "Ferry to Cozumel and two snorkel dives or a discovery dive at Palancar Gardens. Gentle current, 30 meters of visibility, and a coral wall. Includes lunch on the island.",
    },
    duration: { es: "9 horas", en: "9 hours" },
    location: { es: "Cozumel", en: "Cozumel" },
    meeting: {
      es: "Ferry Playa del Carmen, traslado desde Cancún",
      en: "Playa del Carmen ferry, transfer from Cancún",
    },
    meetingQuery: "Muelle Fiscal, Playa del Carmen, México",
    stops: [
      {
        name: { es: "Salida — Muelle Fiscal", en: "Departure — Muelle Fiscal" },
        description: { es: "Ferry a Cozumel, ~45 minutos.", en: "Ferry to Cozumel, ~45 minutes." },
      },
      {
        name: { es: "Palancar Gardens", en: "Palancar Gardens" },
        description: {
          es: "Dos inmersiones de snorkel o bautizo de buceo.",
          en: "Two snorkel dives or a discovery scuba dive.",
        },
      },
      {
        name: { es: "Almuerzo en Cozumel", en: "Lunch in Cozumel" },
        description: { es: "Tiempo libre en el muelle antes del regreso.", en: "Free time at the pier before heading back." },
      },
    ],
    private: {
      pricePerPerson: 159,
      unitCapacity: 10,
      minGuaranteePeople: 6,
      minGuaranteeAmount: 954,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 4,
    },
    includes: [
      { es: "Traslado Cancún–Playa", en: "Cancún–Playa transfer" },
      { es: "Ferry ida y vuelta", en: "Round-trip ferry" },
      { es: "Dos sitios de arrecife", en: "Two reef sites" },
      { es: "Equipo completo", en: "Full gear" },
      { es: "Almuerzo en muelle", en: "Lunch at the pier" },
    ],
    notIncluded: [
      { es: "Propinas de tripulación", en: "Crew tips" },
      { es: "Nitrox", en: "Nitrox" },
    ],
    highlights: [
      { es: "Visibilidad extrema", en: "Extreme visibility" },
      { es: "Palancar", en: "Palancar" },
      { es: "Día completo", en: "Full day" },
    ],
    price: 129,
    rating: 4.8,
    reviewCount: 588,
    image: "/images/cozumel.jpg",
    groupSize: { es: "Hasta 20", en: "Up to 20" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
  },
  {
    slug: "chichen-itza-amanecer",
    name: { es: "Chichén Itzá al amanecer", en: "Chichén Itzá at Sunrise" },
    category: "arqueologico",
    tagline: {
      es: "El Castillo sin filas, con luz dorada",
      en: "El Castillo with no lines, in golden light",
    },
    description: {
      es: "Salida de madrugada para entrar con el primer grupo. Recorrido de 2 horas con arqueólogo: El Castillo, el Juego de Pelota, el Observatorio y el Cenote Sagrado. Almuerzo yucateco y parada en cenote para nadar de regreso.",
      en: "Pre-dawn departure to enter with the first group. A 2-hour tour with an archaeologist: El Castillo, the Ball Court, the Observatory, and the Sacred Cenote. Yucatecan lunch and a cenote swim stop on the way back.",
    },
    duration: { es: "12 horas", en: "12 hours" },
    location: { es: "Chichén Itzá · Yucatán", en: "Chichén Itzá · Yucatán" },
    meeting: { es: "Recogida 5:30–6:00 en hotel", en: "Hotel pickup 5:30–6:00 AM" },
    meetingQuery: "Zona Arqueológica de Chichén Itzá, Yucatán, México",
    stops: [
      {
        name: { es: "El Castillo", en: "El Castillo" },
        description: {
          es: "La pirámide principal, con el primer grupo del día.",
          en: "The main pyramid, with the first group of the day.",
        },
      },
      {
        name: { es: "Juego de Pelota", en: "The Ball Court" },
        description: { es: "El campo de juego de pelota más grande de Mesoamérica.", en: "The largest ball court in Mesoamerica." },
      },
      {
        name: { es: "El Observatorio y Cenote Sagrado", en: "The Observatory and Sacred Cenote" },
        description: { es: "Recorrido con arqueólogo por el resto del sitio.", en: "Tour of the rest of the site with an archaeologist." },
      },
      {
        name: { es: "Cenote de regreso", en: "Cenote on the way back" },
        description: { es: "Parada para nadar antes de volver al hotel.", en: "A swim stop before heading back to the hotel." },
      },
    ],
    private: {
      pricePerPerson: 129,
      unitCapacity: 8,
      minGuaranteePeople: 8,
      minGuaranteeAmount: 1032,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 5,
    },
    includes: [
      { es: "Traslado en van climatizada", en: "Air-conditioned van transfer" },
      { es: "Entrada a la zona arqueológica", en: "Archaeological site entry" },
      { es: "Guía arqueólogo certificado", en: "Certified archaeologist guide" },
      { es: "Almuerzo buffet", en: "Buffet lunch" },
      { es: "Parada en cenote", en: "Cenote stop" },
    ],
    notIncluded: [
      { es: "Propinas", en: "Tips" },
      { es: "Video oficial INAH", en: "Official INAH video" },
      { es: "Souvenirs", en: "Souvenirs" },
    ],
    highlights: [
      { es: "Acceso temprano", en: "Early access" },
      { es: "Guía arqueólogo", en: "Archaeologist guide" },
      { es: "Cenote de regreso", en: "Cenote on the way back" },
    ],
    price: 99,
    originalPrice: 139,
    rating: 4.9,
    reviewCount: 2310,
    image: "/images/chichen-itza.jpg",
    lastMinute: { seats: 4, discountPct: 29, departs: "hoy" },
    groupSize: { es: "Hasta 14", en: "Up to 14" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
  },
  {
    slug: "tulum-playa",
    name: { es: "Tulum ruinas y playa", en: "Tulum Ruins and Beach" },
    category: "arqueologico",
    tagline: {
      es: "Templo sobre el acantilado, luego el mar",
      en: "A temple on the cliff, then the sea",
    },
    description: {
      es: "Recorrido por la zona amurallada de Tulum con historiador: El Castillo, el Templo de los Frescos y vistas al Caribe. Después, tiempo libre en la playa de arena blanca bajo las ruinas. Grupos de mañana para evitar el calor pico.",
      en: "A tour of Tulum's walled city with a historian: El Castillo, the Temple of the Frescoes, and Caribbean views. Afterward, free time on the white-sand beach beneath the ruins. Morning groups to avoid peak heat.",
    },
    duration: { es: "7 horas", en: "7 hours" },
    location: { es: "Tulum", en: "Tulum" },
    meeting: {
      es: "Recogida en hotel Cancún / Riviera Maya",
      en: "Hotel pickup in Cancún / Riviera Maya",
    },
    meetingQuery: "Zona Arqueológica de Tulum, Quintana Roo, México",
    stops: [
      {
        name: { es: "El Castillo de Tulum", en: "El Castillo de Tulum" },
        description: { es: "El templo principal sobre el acantilado.", en: "The main temple on the cliff." },
      },
      {
        name: { es: "Templo de los Frescos", en: "Temple of the Frescoes" },
        description: { es: "Murallas con pinturas mayas originales.", en: "Walls with original Maya paintings." },
      },
      {
        name: { es: "Playa bajo las ruinas", en: "Beach beneath the ruins" },
        description: { es: "Tiempo libre en la playa de arena blanca.", en: "Free time on the white-sand beach." },
      },
    ],
    private: {
      pricePerPerson: 89,
      unitCapacity: 6,
      minGuaranteePeople: 6,
      minGuaranteeAmount: 534,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 3,
    },
    includes: [
      { es: "Traslado", en: "Transfer" },
      { es: "Entrada a ruinas", en: "Ruins entry" },
      { es: "Guía historiador", en: "Historian guide" },
      { es: "Tiempo de playa", en: "Beach time" },
      { es: "Agua y refrigerio", en: "Water and a snack" },
    ],
    notIncluded: [
      { es: "Almuerzo", en: "Lunch" },
      { es: "Sombrilla de playa", en: "Beach umbrella" },
      { es: "Propinas", en: "Tips" },
    ],
    highlights: [
      { es: "Acantilado Caribe", en: "Caribbean cliff" },
      { es: "Playa privada del sitio", en: "The site's private beach" },
      { es: "Grupo matutino", en: "Morning group" },
    ],
    price: 69,
    rating: 4.7,
    reviewCount: 1566,
    image: "/images/tulum.jpg",
    groupSize: { es: "Hasta 18", en: "Up to 18" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
  },
  {
    slug: "coba-selva",
    name: { es: "Cobá y selva", en: "Cobá and Jungle" },
    category: "arqueologico",
    tagline: {
      es: "Pirámide en la selva y lagunas mayas",
      en: "A jungle pyramid and Maya lagoons",
    },
    description: {
      es: "Cobá se recorre en bici entre sacbés (calzadas blancas). Subida opcional a Nohoch Mul, la pirámide más alta de Quintana Roo. Después, almuerzo en pueblo maya y nado en un cenote de caverna.",
      en: "Cobá is explored by bike along sacbés (white causeways). Optional climb up Nohoch Mul, the tallest pyramid in Quintana Roo. Afterward, lunch in a Maya village and a swim in a cave cenote.",
    },
    duration: { es: "10 horas", en: "10 hours" },
    location: { es: "Cobá · Quintana Roo", en: "Cobá · Quintana Roo" },
    meeting: { es: "Recogida en hotel", en: "Hotel pickup" },
    meetingQuery: "Zona Arqueológica de Cobá, Quintana Roo, México",
    stops: [
      {
        name: { es: "Entrada y renta de bici", en: "Entrance and bike rental" },
        description: { es: "Recorrido por los sacbés (calzadas blancas).", en: "Ride along the sacbés (white causeways)." },
      },
      {
        name: { es: "Nohoch Mul", en: "Nohoch Mul" },
        description: { es: "La pirámide más alta de Quintana Roo, subida opcional.", en: "The tallest pyramid in Quintana Roo, optional climb." },
      },
      {
        name: { es: "Cenote y pueblo maya", en: "Cenote and Maya village" },
        description: { es: "Almuerzo regional y nado en cenote de caverna.", en: "Regional lunch and a swim in a cave cenote." },
      },
    ],
    private: {
      pricePerPerson: 115,
      unitCapacity: 6,
      minGuaranteePeople: 6,
      minGuaranteeAmount: 690,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 4,
    },
    includes: [
      { es: "Traslado", en: "Transfer" },
      { es: "Bicicleta en el sitio", en: "Bike at the site" },
      { es: "Entrada a Cobá", en: "Cobá entry" },
      { es: "Guía local", en: "Local guide" },
      { es: "Almuerzo y cenote", en: "Lunch and cenote" },
    ],
    notIncluded: [
      { es: "Propinas", en: "Tips" },
      { es: "Lockers extra", en: "Extra lockers" },
    ],
    highlights: [
      { es: "Nohoch Mul", en: "Nohoch Mul" },
      { es: "Bici en la selva", en: "Jungle biking" },
      { es: "Pueblo maya", en: "Maya village" },
    ],
    price: 89,
    rating: 4.8,
    reviewCount: 874,
    image: "/images/coba.jpg",
    groupSize: { es: "Hasta 16", en: "Up to 16" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
  },
  {
    slug: "ek-balam-cenote",
    name: { es: "Ek Balam y cenote", en: "Ek Balam and Cenote" },
    category: "arqueologico",
    tagline: {
      es: "Estuco maya intacto y agua de caverna",
      en: "Intact Maya stucco and cave water",
    },
    description: {
      es: "Ek Balam guarda uno de los frisos de estuco mejor conservados del mundo maya. Recorrido con epigrafista, subida a la Acrópolis y nado en un cenote cercano de agua turquesa. Menos visitado que Chichén: luz y silencio.",
      en: "Ek Balam holds one of the best-preserved stucco friezes in the Maya world. A tour with an epigrapher, a climb up the Acropolis, and a swim in a nearby turquoise cenote. Less visited than Chichén: light and quiet.",
    },
    duration: { es: "11 horas", en: "11 hours" },
    location: { es: "Ek Balam · Yucatán", en: "Ek Balam · Yucatán" },
    meeting: { es: "Recogida 6:00 en hotel Cancún", en: "Hotel pickup 6:00 AM in Cancún" },
    meetingQuery: "Zona Arqueológica de Ek Balam, Yucatán, México",
    stops: [
      {
        name: { es: "Friso del jaguar y Acrópolis", en: "Jaguar frieze and Acropolis" },
        description: { es: "El estuco maya mejor conservado de la región, con epigrafista.", en: "The best-preserved Maya stucco in the region, with an epigrapher." },
      },
      {
        name: { es: "Cenote cercano", en: "Nearby cenote" },
        description: { es: "Agua turquesa, poca afluencia de gente.", en: "Turquoise water, low crowds." },
      },
      {
        name: { es: "Almuerzo", en: "Lunch" },
        description: { es: "Comida regional antes de volver al hotel.", en: "Regional food before heading back to the hotel." },
      },
    ],
    private: {
      pricePerPerson: 110,
      unitCapacity: 6,
      minGuaranteePeople: 6,
      minGuaranteeAmount: 660,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 4,
    },
    includes: [
      { es: "Traslado", en: "Transfer" },
      { es: "Entrada a Ek Balam", en: "Ek Balam entry" },
      { es: "Guía epigrafista", en: "Epigrapher guide" },
      { es: "Cenote y almuerzo", en: "Cenote and lunch" },
      { es: "Agua todo el día", en: "Water all day" },
    ],
    notIncluded: [
      { es: "Propinas", en: "Tips" },
      { es: "Tirolina opcional", en: "Optional zipline" },
    ],
    highlights: [
      { es: "Friso del jaguar", en: "Jaguar frieze" },
      { es: "Poca afluencia", en: "Low crowds" },
      { es: "Cenote privado", en: "Private cenote" },
    ],
    price: 85,
    originalPrice: 109,
    rating: 4.9,
    reviewCount: 412,
    image: "/images/ek-balam.jpg",
    lastMinute: { seats: 8, discountPct: 22, departs: "manana" },
    groupSize: { es: "Hasta 12", en: "Up to 12" },
    languages: { es: "Español e inglés", en: "Spanish and English" },
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

/**
 * Private-tour total: per-person price for the actual group, but never below
 * whichever floor applies — the minimum person-count guarantee, the flat
 * minimum amount, or the underfill surcharge (a % of a full unit's worth).
 * Children count as full people for private pricing/capacity purposes.
 */
export function privateTourPrice(tour: Tour, adults: number, children: number) {
  const people = adults + children;
  const p = tour.private;
  const perPersonTotal = p.pricePerPerson * people;
  const peopleFloor = p.pricePerPerson * p.minGuaranteePeople;
  const underfillFloor =
    people < p.unitCapacity ? p.pricePerPerson * p.unitCapacity * p.underfillSurchargePct : 0;
  return Math.round(Math.max(perPersonTotal, peopleFloor, p.minGuaranteeAmount, underfillFloor));
}

/** Earliest date a private booking for this tour can be made for. */
export function minPrivateDate(tour: Tour): string {
  const d = new Date();
  d.setDate(d.getDate() + tour.private.minAdvanceDays);
  return d.toISOString().slice(0, 10);
}

export function totalReviewCount() {
  return tours.reduce((acc, t) => acc + t.reviewCount, 0);
}

export function categoryLabel(category: Category, lang: Lang) {
  return category === "acuatico"
    ? lang === "es"
      ? "Acuático"
      : "Water"
    : lang === "es"
      ? "Arqueológico"
      : "Archaeological";
}
