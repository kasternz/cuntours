-- Bookings created through checkout. Written BEFORE the notification email is
-- attempted, so a booking is durably recorded even if Resend is down —
-- that's the whole point: payment + booking record must never depend on the
-- email succeeding.
create table if not exists "bookings" (
  "id" text not null primary key,
  "tour_slug" text not null,
  "tour_name" text not null,
  "date" text not null,
  "adults" integer not null,
  "children" integer not null,
  "tour_type" text not null,
  "pickup" text not null,
  "pickup_time" text not null default '',
  "dietary" text not null default '',
  "mobility" text not null default '',
  "notes" text not null default '',
  "guest_name" text not null,
  "guest_email" text not null,
  "guest_phone" text not null,
  "pay_at_pickup" boolean not null,
  "payment_intent_id" text,
  "total" numeric not null,
  "email_sent" boolean not null default false,
  "created_at" timestamptz not null default now()
);

create index if not exists "bookings_created_at_idx" on "bookings" ("created_at" desc);
