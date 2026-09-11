-- Deposit payment model: 20% deposit (transfer or card) or full payment now.
-- `pay_at_pickup` stays for backward compatibility with existing rows but is
-- no longer written meaningfully — `payment_method` is the source of truth.
alter table "bookings" add column if not exists "payment_method" text not null default 'full_card';
alter table "bookings" add column if not exists "deposit_amount" numeric;
alter table "bookings" add column if not exists "balance_due" numeric;
