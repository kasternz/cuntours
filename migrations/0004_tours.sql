-- Tours now live here instead of being hardcoded in source — this is what
-- lets the admin panel add/edit/delete tours without a code deploy. Each
-- tour is stored as one JSONB document (matching the app's Tour type
-- exactly), keeping this migration simple and forgiving of future field
-- additions — no column-per-field schema to keep in sync with the app.
create table if not exists "tours" (
  "slug" text not null primary key,
  "data" jsonb not null,
  "sort_order" integer not null default 0,
  "updated_at" timestamptz not null default now()
);
