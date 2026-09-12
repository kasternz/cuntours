alter table "bookings" add column if not exists "discount_code" text;
alter table "bookings" add column if not exists "discount_pct" numeric;
