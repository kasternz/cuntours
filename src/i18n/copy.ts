export type Lang = "es" | "en";
export type Localized = { es: string; en: string };

export const copy = {
  // Header / nav
  navTours: { es: "Tours", en: "Tours" },
  navLastMinute: { es: "Último día", en: "Last-minute" },
  navReviews: { es: "Reseñas", en: "Reviews" },
  book: { es: "Reservar", en: "Book" },
  openMenu: { es: "Abrir menú", en: "Open menu" },
  closeMenu: { es: "Cerrar menú", en: "Close menu" },

  // Footer
  footerBlurb: {
    es: "Operadora local en Cancún. Tours acuáticos y arqueológicos con compra directa, sin marketplace.",
    en: "Local tour operator in Cancún. Water and archaeological tours with direct purchase, no marketplace.",
  },
  explore: { es: "Explorar", en: "Explore" },
  allTours: { es: "Todos los tours", en: "All tours" },
  waterActivities: { es: "Actividades acuáticas", en: "Water activities" },
  archTours: { es: "Tours arqueológicos", en: "Archaeological tours" },
  travelerReviews: { es: "Reseñas de viajeros", en: "Traveler reviews" },
  lastMinuteDeals: { es: "Ofertas de último día", en: "Last-minute deals" },
  operations: { es: "Operación", en: "Operations" },
  operationsLocation: { es: "Cancún, Quintana Roo", en: "Cancún, Quintana Roo" },
  operationsPickup: {
    es: "Recogida en zona hotelera, downtown y Riviera Maya",
    en: "Pickup from the hotel zone, downtown, and the Riviera Maya",
  },
  operationsCancel: {
    es: "Cancelación gratis hasta 24 h antes",
    en: "Free cancellation up to 24h before",
  },
  footerTagline: {
    es: "Cuntours · Tours en Cancún y la Riviera Maya.",
    en: "Cuntours · Tours in Cancún and the Riviera Maya.",
  },

  // TripAdvisor badge
  reviewsOnTripAdvisor: { es: "reseñas en TripAdvisor", en: "reviews on TripAdvisor" },
  seeAllOnTripAdvisor: {
    es: "Ver todas las reseñas en TripAdvisor",
    en: "See all reviews on TripAdvisor",
  },

  // Resenas page
  travelers: { es: "Viajeros", en: "Travelers" },
  whatTravelersSay: { es: "Lo que dicen nuestros viajeros", en: "What our travelers say" },
  reviewsRealNote: {
    es: "Nuestras reseñas reales viven en TripAdvisor, verificadas por ellos — no aquí en forma de texto, para que siempre veas la fuente original.",
    en: "Our real reviews live on TripAdvisor, verified by them — not written out here, so you always see the original source.",
  },
  leavingTomorrow: { es: "¿Sales mañana?", en: "Leaving tomorrow?" },

  // Tours catalog page
  catalog: { es: "Catálogo", en: "Catalog" },
  catalogTitle: {
    es: "Tours en Cancún y Riviera Maya",
    en: "Tours in Cancún and the Riviera Maya",
  },
  catalogLead: {
    es: "Compra directa. Recogida en hotel. Elige agua o piedra — o quédate con lo que sale hoy.",
    en: "Direct purchase. Hotel pickup. Choose water or stone — or grab what's leaving today.",
  },
  filterAll: { es: "Todos", en: "All" },
  filterWater: { es: "Acuáticos", en: "Water" },
  filterArch: { es: "Arqueológicos", en: "Archaeological" },
  filterLastMinute: { es: "Último día", en: "Last-minute" },
  tourSingular: { es: "tour", en: "tour" },
  tourPlural: { es: "tours", en: "tours" },
  noToursForFilter: { es: "No hay tours en este filtro.", en: "No tours match this filter." },

  // Tour detail
  tourNotFound: { es: "Tour no encontrado", en: "Tour not found" },
  tourNotFoundBody: {
    es: "Ese enlace ya no existe o cambió de nombre.",
    en: "This link no longer exists or has changed.",
  },
  backToCatalog: { es: "Volver al catálogo", en: "Back to catalog" },
  travelerReviewsShort: { es: "reseñas de viajeros", en: "traveler reviews" },
  metaDuration: { es: "Duración", en: "Duration" },
  metaLocation: { es: "Lugar", en: "Location" },
  metaGroup: { es: "Grupo", en: "Group" },
  metaLanguages: { es: "Idiomas", en: "Languages" },
  dealToday: { es: "Oferta de último día", en: "Today's deal" },
  dealTomorrow: { es: "Oferta de último aviso", en: "Tomorrow's deal" },
  seatsLeftPrefix: { es: "Quedan", en: "" },
  seatsWord: { es: "asientos", en: "seats left" },
  closesIn: { es: "cierra en", en: "closes in" },
  whatsIncluded: { es: "Qué incluye", en: "What's included" },
  notIncludedTitle: { es: "No incluye", en: "Not included" },
  meetingPoint: { es: "Punto de encuentro", en: "Meeting point" },
  restrictionsTitle: { es: "Restricciones", en: "Restrictions" },
  extraTaxTitle: { es: "Costo adicional en el sitio", en: "Additional cost on site" },
  peopleLabel: { es: "Personas", en: "People" },
  discountCodeLabel: { es: "Código de descuento", en: "Discount code" },
  applyCode: { es: "Aplicar", en: "Apply" },
  discountApplied: { es: "Descuento aplicado", en: "Discount applied" },
  removeCode: { es: "Quitar", en: "Remove" },
  alsoLike: { es: "También te puede interesar", en: "You might also like" },
  perAdultChild: { es: "por adulto · niño 60%", en: "per adult · child 60%" },
  perAdult: { es: "por adulto", en: "per adult" },
  dateLabel: { es: "Fecha", en: "Date" },
  pickupHotelLabel: { es: "Hotel de recogida", en: "Pickup hotel" },
  pickupPlaceholder: { es: "Ej. Grand Fiesta Americana", en: "E.g. Grand Fiesta Americana" },
  adults: { es: "Adultos", en: "Adults" },
  children: { es: "Niños", en: "Children" },
  total: { es: "Total", en: "Total" },
  bookNow: { es: "Reservar ahora", en: "Book now" },
  cancelNote: {
    es: "Cancelación gratis hasta 24 h antes. Confirmación inmediata.",
    en: "Free cancellation up to 24h before. Instant confirmation.",
  },
  totalPrefix: { es: "total ·", en: "total ·" },
  travelersWord: { es: "viajeros", en: "travelers" },

  // Checkout
  noBookingInProgress: { es: "No hay reserva en curso", en: "No booking in progress" },
  noBookingBody: {
    es: "Elige un tour y pulsa Reservar ahora para comprar directo.",
    en: "Choose a tour and tap Book now to purchase directly.",
  },
  viewTours: { es: "Ver tours", en: "View tours" },
  directPurchase: { es: "Compra directa", en: "Direct purchase" },
  bookingDetails: { es: "Datos de la reserva", en: "Booking details" },
  leadTraveler: { es: "Viajero principal", en: "Lead traveler" },
  fullName: { es: "Nombre completo", en: "Full name" },
  email: { es: "Correo", en: "Email" },
  phoneWhatsapp: { es: "Teléfono / WhatsApp", en: "Phone / WhatsApp" },
  notesLabel: {
    es: "Notas adicionales (habitación, vuelo, etc.)",
    en: "Additional notes (room, flight, etc.)",
  },
  tourTypeLabel: { es: "Tipo de tour", en: "Tour type" },
  sharedTour: { es: "Compartido", en: "Shared" },
  privateTour: { es: "Privado (a confirmar)", en: "Private (to confirm)" },
  privateOnlyCard: {
    es: "Los tours privados solo se pagan con tarjeta, no en efectivo.",
    en: "Private tours are card-only — cash isn't accepted.",
  },
  privateAdvanceNotice: {
    es: "Los tours privados requieren al menos",
    en: "Private tours require at least",
  },
  privateAdvanceDaysWord: { es: "días de anticipación.", en: "days of advance notice." },
  privateMinNote: {
    es: "Tarifa mínima de grupo privado aplicada — cubre la unidad completa aunque vayan menos personas.",
    en: "Minimum private-group rate applied — covers the full vehicle/boat even with fewer people.",
  },
  dietaryLabel: { es: "Restricción alimenticia", en: "Dietary restriction" },
  dietaryPlaceholder: {
    es: "Ej. vegetariano, alergia a mariscos",
    en: "E.g. vegetarian, shellfish allergy",
  },
  mobilityLabel: { es: "Movilidad especial", en: "Special mobility needs" },
  mobilityPlaceholder: {
    es: "Ej. silla de ruedas, dificultad para caminar",
    en: "E.g. wheelchair, difficulty walking",
  },
  pickupTimeLabel: { es: "Hora preferida de recogida", en: "Preferred pickup time" },
  optional: { es: "opcional", en: "optional" },
  sendingBooking: { es: "Enviando reserva…", en: "Sending booking…" },
  errEmailSend: {
    es: "No se pudo enviar la reserva. Intenta de nuevo o escríbenos por WhatsApp.",
    en: "Couldn't send the booking. Please try again or message us on WhatsApp.",
  },
  payment: { es: "Pago", en: "Payment" },
  depositOption: { es: "Depósito 20% para reservar", en: "20% deposit to reserve" },
  fullCardOption: { es: "Pagar completo ahora con tarjeta", en: "Pay in full now by card" },
  depositViaTransfer: { es: "Transferencia bancaria", en: "Bank transfer" },
  depositViaCard: { es: "Con tarjeta", en: "By card" },
  depositMethodLabel: { es: "¿Cómo prefieres pagar el depósito?", en: "How would you like to pay the deposit?" },
  depositAmountLabel: { es: "Depósito (20%)", en: "Deposit (20%)" },
  balanceDueLabel: { es: "Saldo pendiente", en: "Balance due" },
  balanceDueNote: {
    es: "El saldo se paga al recoger, en efectivo o tarjeta.",
    en: "The balance is paid at pickup, cash or card.",
  },
  transferInstructions: {
    es: "Transfiere el depósito a esta cuenta y manda tu comprobante por WhatsApp para confirmar tu reserva:",
    en: "Transfer the deposit to this account and send your receipt via WhatsApp to confirm your booking:",
  },
  transferBank: { es: "Banco", en: "Bank" },
  transferHolder: { es: "Titular", en: "Account holder" },
  transferClabe: { es: "CLABE", en: "CLABE" },
  sendReceiptWhatsapp: { es: "Enviar comprobante por WhatsApp", en: "Send receipt via WhatsApp" },
  confirmReservationTransfer: {
    es: "Confirmar reserva (pagaré por transferencia)",
    en: "Confirm booking (I'll pay by transfer)",
  },
  payNowCard: { es: "Pagar ahora con tarjeta", en: "Pay now by card" },
  cardNumber: { es: "Número de tarjeta", en: "Card number" },
  expires: { es: "Vence", en: "Expires" },
  cvc: { es: "CVC", en: "CVC" },
  sampleCardNote: {
    es: "En esta reserva de muestra el cargo no se procesa con un banco real.",
    en: "This is a sample booking — no real bank charge is processed.",
  },
  errRequired: {
    es: "Nombre, correo y teléfono son obligatorios.",
    en: "Name, email, and phone are required.",
  },
  errEmail: { es: "Revisa el correo.", en: "Check your email address." },
  errCard: { es: "Número de tarjeta incompleto.", en: "Incomplete card number." },
  errExpiry: { es: "Vencimiento en formato MM/AA.", en: "Expiry in MM/YY format." },
  errCvc: { es: "CVC incompleto.", en: "Incomplete CVC." },
  errGeneric: {
    es: "No se pudo confirmar. Intenta de nuevo.",
    en: "Couldn't confirm. Please try again.",
  },
  confirming: { es: "Confirmando…", en: "Confirming…" },
  confirmButton: { es: "Confirmar ·", en: "Confirm ·" },
  rowTravelers: { es: "Viajeros", en: "Travelers" },
  rowPickup: { es: "Recogida", en: "Pickup" },
  changeTour: { es: "Cambiar tour", en: "Change tour" },
  adultsWord: { es: "adultos", en: "adults" },
  childrenWord: { es: "niños", en: "children" },

  // Confirmacion
  noRecentBooking: { es: "No hay una reserva reciente", en: "No recent booking" },
  noRecentBookingBody: {
    es: "Cuando confirmes un tour, el folio y los datos de recogida aparecen aquí.",
    en: "Once you confirm a tour, the confirmation code and pickup details show up here.",
  },
  bookingConfirmed: { es: "Reserva confirmada", en: "Booking confirmed" },
  folioPrefix: { es: "Folio", en: "Confirmation code" },
  folioSuffix: {
    es: ". Te recogemos en el hotel. Revisa el correo — y guarda este folio.",
    en: ". We'll pick you up at the hotel. Check your email — and save this code.",
  },
  infoDate: { es: "Fecha", en: "Date" },
  infoTravelers: { es: "Viajeros", en: "Travelers" },
  infoPickup: { es: "Recogida", en: "Pickup" },
  infoPayment: { es: "Pago", en: "Payment" },
  paidByCard: { es: "Tarjeta ·", en: "Card ·" },
  step1Title: { es: "Correo", en: "Email" },
  step1Body: { es: "Confirmación a", en: "Confirmation sent to" },
  step1BodyFallback: { es: "tu correo", en: "your email" },
  step2Title: { es: "Recogida", en: "Pickup" },
  step2Body: {
    es: "El guía confirma hora la tarde anterior.",
    en: "Your guide confirms the time the afternoon before.",
  },
  step3Title: { es: "Sale", en: "Departure" },
  step3Body: {
    es: "Lleva traje de baño, bloqueador y el folio.",
    en: "Bring a swimsuit, sunscreen, and your confirmation code.",
  },
  bookAnother: { es: "Reservar otro tour", en: "Book another tour" },
  backHome: { es: "Volver al inicio", en: "Back to home" },

  // Homepage hero
  heroTitle: {
    es: "Tours de último día, compra directa.",
    en: "Last-minute tours, direct purchase.",
  },
  heroLead: {
    es: "Catamarán, cenotes, Chichén Itzá y Tulum. Operadora local: eliges, pagas aquí y mañana estás en el agua o frente a la pirámide.",
    en: "Catamaran, cenotes, Chichén Itzá, and Tulum. Local operator: you choose, pay here, and tomorrow you're in the water or in front of the pyramid.",
  },
  todaysDeals: { es: "Ofertas de hoy", en: "Today's deals" },
  viewCatalog: { es: "Ver catálogo", en: "View catalog" },

  // Feature strip
  featLastMinuteT: { es: "Último día", en: "Last-minute" },
  featLastMinuteD: {
    es: "Asientos que salen hoy o mañana",
    en: "Seats leaving today or tomorrow",
  },
  featDirectT: { es: "Compra directa", en: "Direct purchase" },
  featDirectD: {
    es: "Sin marketplace. Confirmación al instante",
    en: "No marketplace. Instant confirmation",
  },
  featSeaT: { es: "Mar y ruinas", en: "Sea and ruins" },
  featSeaD: {
    es: "Acuáticos y arqueológicos, un solo operador",
    en: "Water and archaeological tours, one operator",
  },

  // Last-minute section
  lastMinuteEyebrow: { es: "Último día", en: "Last-minute" },
  lastMinuteTitle: { es: "Sale hoy. Quedan asientos.", en: "Leaving today. Seats left." },
  lastMinuteLead: {
    es: "Precio de cierre para salidas con lugares libres. El reloj corre hasta las 18:00.",
    en: "Closing price for departures with open spots. The clock runs until 6:00 PM.",
  },
  buy: { es: "Comprar", en: "Buy" },
  seeDeals: { es: "Ver ofertas", en: "See deals" },
  todayBadge: { es: "Hoy", en: "Today" },
  tomorrowBadge: { es: "Mañana", en: "Tomorrow" },

  // Category tiles
  waterEyebrow: { es: "Agua", en: "Water" },
  waterTitle: { es: "Actividades acuáticas", en: "Water activities" },
  waterDesc: {
    es: "Catamarán, arrecife, tiburón ballena, cenotes y Cozumel.",
    en: "Catamaran, reef, whale sharks, cenotes, and Cozumel.",
  },
  stoneEyebrow: { es: "Piedra", en: "Stone" },
  stoneTitle: { es: "Tours arqueológicos", en: "Archaeological tours" },
  stoneDesc: {
    es: "Chichén Itzá, Tulum, Cobá y Ek Balam con guía certificado.",
    en: "Chichén Itzá, Tulum, Cobá, and Ek Balam with a certified guide.",
  },

  // Catalog section on homepage
  theCatalog: { es: "El catálogo", en: "The catalog" },
  viewAll: { es: "Ver todos", en: "View all" },

  // Three steps
  threeStepsTitle: {
    es: "Tres pasos, sin WhatsApp eterno",
    en: "Three steps, no endless WhatsApp",
  },
  step1: { es: "Elige", en: "Choose" },
  step1D: {
    es: "Acuático o arqueológico. Filtra por último día si sales mañana.",
    en: "Water or archaeological. Filter by last-minute if you're leaving tomorrow.",
  },
  step2: { es: "Compra", en: "Purchase" },
  step2D: {
    es: "Fecha, hotel de recogida y pago aquí. Confirmación al instante.",
    en: "Date, pickup hotel, and payment here. Instant confirmation.",
  },
  step3: { es: "Sale", en: "Depart" },
  step3D: {
    es: "Te recogemos. Guía certificado. Cancelación gratis 24 h antes.",
    en: "We pick you up. Certified guide. Free cancellation 24h before.",
  },

  // FAQ
  faqTitle: { es: "Preguntas de último minuto", en: "Last-minute questions" },
  faq1q: { es: "¿Puedo salir hoy o mañana?", en: "Can I leave today or tomorrow?" },
  faq1a: {
    es: "Sí. Las ofertas de último día son salidas con asientos libres para hoy o mañana. Cierra la venta a las 18:00. El resto del catálogo se reserva con cualquier fecha.",
    en: "Yes. Last-minute deals are departures with open seats for today or tomorrow. Sales close at 6:00 PM. The rest of the catalog can be booked for any date.",
  },
  faq2q: { es: "¿La compra es directa?", en: "Is the purchase direct?" },
  faq2a: {
    es: "Sí. Operamos desde Cancún: eliges el tour, pagas aquí o al recoger en el hotel, y recibes un folio CT al instante. Sin marketplace ni comisión de tercero.",
    en: "Yes. We operate from Cancún: choose your tour, pay here or at hotel pickup, and get a CT confirmation code instantly. No marketplace, no third-party fees.",
  },
  faq3q: { es: "¿Las reseñas son de TripAdvisor?", en: "Are the reviews from TripAdvisor?" },
  faq3a: {
    es: "Sí — mostramos nuestra calificación real de TripAdvisor con un enlace directo a nuestro perfil verificado, para que siempre puedas confirmar la fuente.",
    en: "Yes — we show our real TripAdvisor rating with a direct link to our verified profile, so you can always confirm the source.",
  },
  faq4q: { es: "¿Qué incluye la recogida?", en: "What does pickup include?" },
  faq4a: {
    es: "Zona hotelera de Cancún, downtown y buena parte de la Riviera Maya. Indica el nombre del hotel al reservar. Si estás en Airbnb, usa el hotel más cercano o un punto de encuentro.",
    en: "Cancún's hotel zone, downtown, and much of the Riviera Maya. Tell us your hotel name when booking. If you're in an Airbnb, use the nearest hotel or a meeting point.",
  },
  faq5q: { es: "¿Puedo cancelar?", en: "Can I cancel?" },
  faq5a: {
    es: "Cancelación gratis hasta 24 horas antes. Si el mar o el INAH cierran el sitio, se reprograma o se devuelve el 100%. Niños pagan el 60% del adulto.",
    en: "Free cancellation up to 24 hours before. If the sea or INAH closes the site, we reschedule or fully refund. Children pay 60% of the adult price.",
  },

  // Final CTA
  finalCtaTitle: { es: "¿Llegaste ayer y no tienes plan?", en: "Just arrived with no plan yet?" },
  finalCtaBody: {
    es: "Las ofertas de último día se liberan cada mañana. Recogida en hotel incluida.",
    en: "Last-minute deals are released every morning. Hotel pickup included.",
  },
  finalCtaBullet1: { es: "Guía certificado INAH / marina", en: "INAH / marine certified guide" },
  finalCtaBullet2: { es: "Grupos chicos", en: "Small groups" },
  finalCtaBullet3: { es: "Cancelación 24 h", en: "24h cancellation" },
  finalCtaButton: { es: "Ver salidas de hoy", en: "See today's departures" },

  // Category labels (tours.ts)
  categoryWater: { es: "Acuático", en: "Water" },
  categoryArch: { es: "Arqueológico", en: "Archaeological" },
} satisfies Record<string, Localized>;
