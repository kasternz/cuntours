-- Example restrictions/extraTax content for the original 9 seeded tours.
-- These are reasonable starting points based on how these real attractions
-- typically operate — verify/adjust the peso amounts and wording from the
-- admin panel, they're estimates, not confirmed current rates.

update tours set data = data || jsonb_build_object(
  'extraTax', jsonb_build_object(
    'es', 'Impuesto de muelle de aprox. $12 USD por persona, pagado en efectivo al abordar.',
    'en', 'Pier tax of approx. $12 USD per person, paid in cash when boarding.'),
  'restrictions', jsonb_build_object(
    'es', 'No recomendado para embarazadas o personas con problemas de columna o cardíacos. Niños desde 4 años.',
    'en', 'Not recommended for pregnant women or those with back/heart conditions. Children from age 4.')
) where slug = 'catamaran-isla-mujeres';

update tours set data = data || jsonb_build_object(
  'restrictions', jsonb_build_object(
    'es', 'Debes saber nadar. No recomendado para embarazadas.',
    'en', 'Must know how to swim. Not recommended for pregnant women.')
) where slug = 'snorkel-arrecife-cancun';

update tours set data = data || jsonb_build_object(
  'restrictions', jsonb_build_object(
    'es', 'Temporada junio–septiembre. Debes saber nadar; chaleco salvavidas obligatorio. No apto para embarazadas.',
    'en', 'Season runs June–September. Must know how to swim; life vest mandatory. Not suitable for pregnant women.')
) where slug = 'tiburon-ballena';

update tours set data = data || jsonb_build_object(
  'restrictions', jsonb_build_object(
    'es', 'Solo bloqueador solar biodegradable dentro de los cenotes. Niños desde 5 años en la caverna.',
    'en', 'Only biodegradable sunscreen allowed inside the cenotes. Children from age 5 in the cave section.')
) where slug = 'cenotes-sagrados';

update tours set data = data || jsonb_build_object(
  'extraTax', jsonb_build_object(
    'es', 'Impuesto de parque marino de Cozumel, aprox. $5 USD por persona, pagado en el sitio.',
    'en', 'Cozumel marine park fee, approx. $5 USD per person, paid on site.'),
  'restrictions', jsonb_build_object(
    'es', 'Certificación de buceo no requerida para snorkel. El bautizo de buceo requiere saber nadar.',
    'en', 'No dive certification needed for snorkeling. The discovery dive requires knowing how to swim.')
) where slug = 'cozumel-palancar';

update tours set data = data || jsonb_build_object(
  'extraTax', jsonb_build_object(
    'es', 'Impuesto estatal de aprox. $800 pesos MXN por persona, pagado en efectivo al llegar (no incluido en el precio).',
    'en', 'State tax of approx. $800 MXN per person, paid in cash on arrival (not included in the tour price).'),
  'restrictions', jsonb_build_object(
    'es', 'Uso de dron prohibido en la zona arqueológica. Se recomienda gorra, bloqueador y calzado cómodo.',
    'en', 'Drone use is prohibited on site. A hat, sunscreen, and comfortable shoes are recommended.')
) where slug = 'chichen-itza-amanecer';

update tours set data = data || jsonb_build_object(
  'restrictions', jsonb_build_object(
    'es', 'Terreno irregular con desniveles; la movilidad puede ser limitada en algunas zonas del sitio.',
    'en', 'Uneven terrain with elevation changes; mobility may be limited in some areas of the site.')
) where slug = 'tulum-playa';

update tours set data = data || jsonb_build_object(
  'extraTax', jsonb_build_object(
    'es', 'Tasa de zona arqueológica de aprox. $95 pesos MXN por persona desde 8 años, pagada en el sitio.',
    'en', 'Archaeological site fee of approx. $95 MXN per person from age 8, paid on site.'),
  'restrictions', jsonb_build_object(
    'es', 'La subida a Nohoch Mul es opcional y requiere buena condición física.',
    'en', 'The climb up Nohoch Mul is optional and requires reasonable physical fitness.')
) where slug = 'coba-selva';

update tours set data = data || jsonb_build_object(
  'extraTax', jsonb_build_object(
    'es', 'Tasa de zona arqueológica de aprox. $105 pesos MXN por persona desde 8 años, pagada en el sitio.',
    'en', 'Archaeological site fee of approx. $105 MXN per person from age 8, paid on site.'),
  'restrictions', jsonb_build_object(
    'es', 'El cenote es de caverna semi-abierta; no recomendado para claustrofobia severa.',
    'en', 'The cenote is a semi-open cave; not recommended for severe claustrophobia.')
) where slug = 'ek-balam-cenote';
