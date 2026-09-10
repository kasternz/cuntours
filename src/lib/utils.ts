import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(amount: number, lang: "es" | "en" = "es") {
  return new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateLong(iso: string, lang: "es" | "en" = "es") {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function todayIso(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
