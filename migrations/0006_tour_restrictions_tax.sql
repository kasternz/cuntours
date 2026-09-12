-- Adds `restrictions` and `extraTax` to any existing tour rows that predate
-- these fields, so the app never sees `undefined` for them. New tours saved
-- from the admin panel already include both.
update tours
set data = data || jsonb_build_object(
  'restrictions', coalesce(data->'restrictions', '{"es":"","en":""}'::jsonb),
  'extraTax', coalesce(data->'extraTax', '{"es":"","en":""}'::jsonb)
)
where data->'restrictions' is null or data->'extraTax' is null;
