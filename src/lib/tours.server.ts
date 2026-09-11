import { getSql } from "./db";
import type { Tour } from "./tours";

/** All tours, sorted the way they should display. Public — no auth needed to read. */
export async function listToursDb(): Promise<Tour[]> {
  const sql = await getSql();
  const rows = await sql<{ data: Tour }>`select data from tours order by sort_order asc`;
  return rows.map((r) => r.data);
}

/** Admin-only: create or fully replace a tour by slug. */
export async function upsertTourDb(tour: Tour, sortOrder: number) {
  const sql = await getSql();
  await sql`
    insert into tours (slug, data, sort_order, updated_at)
    values (${tour.slug}, ${JSON.stringify(tour)}::jsonb, ${sortOrder}, now())
    on conflict (slug) do update set data = excluded.data, sort_order = excluded.sort_order, updated_at = now()
  `;
}

/** Admin-only: remove a tour permanently. */
export async function deleteTourDb(slug: string) {
  const sql = await getSql();
  await sql`delete from tours where slug = ${slug}`;
}

/** Highest current sort_order + 1, for appending a new tour at the end. */
export async function nextSortOrder(): Promise<number> {
  const sql = await getSql();
  const rows = await sql<{ max: number | null }>`select max(sort_order) as max from tours`;
  return (rows[0]?.max ?? -1) + 1;
}
