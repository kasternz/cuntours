-- Tracks the real SPEI transfer created through MercadoPago. `payment_status`
-- is 'confirmed' immediately for card payments (Stripe already confirms
-- synchronously) and starts 'pending' for SPEI transfers until MercadoPago's
-- webhook reports the transfer arrived.
alter table "bookings" add column if not exists "mercadopago_payment_id" text;
alter table "bookings" add column if not exists "payment_status" text not null default 'confirmed';
