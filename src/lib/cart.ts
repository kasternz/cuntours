import { create } from "zustand";
import { tourPrice, getTour } from "./tours";

export type BookingDraft = {
  tourSlug: string;
  date: string;
  adults: number;
  children: number;
  pickup: string;
};

export type Guest = {
  name: string;
  email: string;
  phone: string;
  notes: string;
  payAtPickup: boolean;
};

export type ConfirmedBooking = BookingDraft &
  Guest & {
    id: string;
    tourName: string;
    total: number;
    createdAt: string;
  };

const STORAGE_KEY = "cuntours-last-booking";

type CartState = {
  draft: BookingDraft | null;
  guest: Guest;
  lastBooking: ConfirmedBooking | null;
  setDraft: (draft: BookingDraft) => void;
  patchDraft: (patch: Partial<BookingDraft>) => void;
  patchGuest: (patch: Partial<Guest>) => void;
  confirm: () => ConfirmedBooking | null;
  loadLast: () => void;
};

const emptyGuest: Guest = {
  name: "",
  email: "",
  phone: "",
  notes: "",
  payAtPickup: true,
};

function bookingId() {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `CT-${n}`;
}

export const useCart = create<CartState>((set, get) => ({
  draft: null,
  guest: emptyGuest,
  lastBooking: null,
  setDraft: (draft) => set({ draft }),
  patchDraft: (patch) => {
    const current = get().draft;
    if (!current) return;
    set({ draft: { ...current, ...patch } });
  },
  patchGuest: (patch) => set({ guest: { ...get().guest, ...patch } }),
  confirm: () => {
    const { draft, guest } = get();
    if (!draft) return null;
    const tour = getTour(draft.tourSlug);
    if (!tour) return null;
    const booking: ConfirmedBooking = {
      ...draft,
      ...guest,
      id: bookingId(),
      tourName: tour.name,
      total: tourPrice(tour, draft.adults, draft.children),
      createdAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
    } catch {
      /* ignore quota */
    }
    set({ lastBooking: booking, draft: null });
    return booking;
  },
  loadLast: () => {
    if (get().lastBooking) return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      set({ lastBooking: JSON.parse(raw) as ConfirmedBooking });
    } catch {
      /* ignore */
    }
  },
}));
