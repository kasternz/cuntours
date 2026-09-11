/**
 * Embeds a Google Map centered on a plain-text place search (no API SDK
 * needed — the Embed API geocodes the query server-side on Google's end).
 * Renders nothing if the key isn't configured yet.
 */
export function PlaceMap({ query, className }: { query: string; className?: string }) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  if (!key || !query) return null;

  const src = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(query)}`;

  return (
    <iframe
      title={query}
      src={src}
      className={className ?? "h-56 w-full rounded-[var(--radius-md)] border-0"}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
