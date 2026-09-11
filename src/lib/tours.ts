import type { Lang } from "@/i18n/copy";
import { useLoaderData } from "@tanstack/react-router";

/** Reads the tours array loaded once at the root route — use this instead of
 * fetching tours again in every component. */
export function useTours(): Tour[] {
  return useLoaderData({ from: "__root__" }).tours;
}

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



export function getTour(tours: Tour[], slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function lastMinuteTours(tours: Tour[]) {
  return tours.filter((t) => t.lastMinute);
}

export function toursByCategory(tours: Tour[], category: Category) {
  return tours.filter((t) => t.category === category);
}

export function relatedTours(tours: Tour[], slug: string, limit = 3) {
  const current = getTour(tours, slug);
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

export function totalReviewCount(tours: Tour[]) {
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

/** A blank tour template for the "new tour" admin form. */
export function blankTour(): Tour {
  const empty = { es: "", en: "" };
  return {
    slug: "",
    name: empty,
    category: "acuatico",
    tagline: empty,
    description: empty,
    duration: empty,
    location: empty,
    meeting: empty,
    meetingQuery: "",
    stops: [],
    private: {
      pricePerPerson: 0,
      unitCapacity: 8,
      minGuaranteePeople: 4,
      minGuaranteeAmount: 0,
      underfillSurchargePct: 0.25,
      minAdvanceDays: 3,
    },
    includes: [],
    notIncluded: [],
    highlights: [],
    price: 0,
    rating: 5,
    reviewCount: 0,
    image: "",
    groupSize: empty,
    languages: { es: "Español e inglés", en: "Spanish and English" },
  };
}
