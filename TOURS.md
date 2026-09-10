# Editar tours — guía rápida

Todo el catálogo vive en **`src/lib/tours.ts`** (un solo archivo). No hay base de datos que administrar: editas el archivo, subes las fotos, haces `git push`, y Vercel reconstruye el sitio solo.

## 1. Fotos

- Ponlas en **`public/images/`**
- Cada tour usa **una** foto principal (`image`). Formato recomendado: **JPG, orientación horizontal (3:2 o 16:10)**, idealmente 1600×1067px o similar — no hace falta más resolución, solo pesa el sitio.
- Nombra el archivo algo simple y sin espacios ni acentos, ej. `catamaran-isla.jpg`, `tulum.jpg`.
- Esa misma foto se usa en 3 lugares (tarjeta del catálogo, portada del tour, ofertas de último día), así que elige la que mejor represente el tour de un vistazo.
- Tip de peso: si la foto pesa más de ~500 KB, convertir a **.webp** ayuda mucho a la velocidad de carga sin perder calidad visible. No es obligatorio, pero se nota.

## 2. Editar un tour que ya existe

Busca el tour por su `slug` dentro de `tours.ts` (ej. `"catamaran-isla-mujeres"`) y cambia lo que necesites. Cada campo de texto está en **español e inglés** — edita ambos:

```ts
name: { es: "Catamarán a Isla Mujeres", en: "Isla Mujeres Catamaran" },
```

Campos disponibles por tour:

| Campo | Qué es |
|---|---|
| `slug` | Va en la URL (`/tours/este-slug`). No lo cambies una vez publicado — rompe enlaces guardados/compartidos. |
| `name` | Nombre del tour |
| `category` | `"acuatico"` o `"arqueologico"` (controla en qué filtro aparece) |
| `tagline` | Una línea corta, debajo del nombre |
| `description` | El párrafo largo en la página del tour |
| `duration` | Ej. `"7 horas"` / `"7 hours"` |
| `location` | Ej. `"Cancún · Isla Mujeres"` |
| `meeting` | Punto/hora de encuentro |
| `includes` | Lista de qué incluye (array — un `{es, en}` por línea) |
| `notIncluded` | Lista de qué NO incluye |
| `highlights` | 2-3 etiquetas cortas que aparecen como "pills" |
| `price` | Precio actual en USD (número, sin símbolo) |
| `originalPrice` | Opcional — si lo pones, se muestra tachado arriba del precio (para mostrar descuento) |
| `image` | Ruta de la foto, ej. `"/images/catamaran-isla.jpg"` |
| `lastMinute` | Opcional — quítalo o coméntalo si el tour ya no es oferta de último día |
| `groupSize` | Ej. `"Hasta 40"` |
| `languages` | Ej. `"Español e inglés"` |

## 3. Agregar un tour nuevo

Copia un bloque de tour completo (de `{` a `},`) y pégalo dentro del array `tours = [...]`, cambia todos los valores, y asegúrate de que el `slug` sea único.

## 4. Quitar un tour

Borra su bloque completo del array. Si alguien tiene el link guardado, verá "Tour no encontrado" automáticamente — no hay que hacer nada más.

## 5. ⚠️ Pendiente importante: `rating` y `reviewCount`

Cada tour todavía tiene un `rating` (ej. `4.8`) y `reviewCount` (ej. `1842`) **de muestra, no reales** — son los únicos números que quedan sin reemplazar por datos verdaderos (ya arreglamos las reseñas de texto y el badge principal de TripAdvisor en todo el resto del sitio).

Cuando agregues tours reales, dos opciones:
- Si tienes datos reales por tour (de Viator, GetYourGuide, TripAdvisor por producto, etc.), reemplaza estos números por los verdaderos.
- Si no los tienes todavía, avísame y te ayudo a quitar esos números de la tarjeta/página del tour por ahora, dejando solo el badge real de TripAdvisor general — así no queda ningún número inventado visible en el sitio.

## 6. Flujo de trabajo

```
cd ~/documents/cuntours
# edita tours.ts, agrega fotos a public/images/
npm run dev          # opcional: verlo local antes de subir
git add .
git commit -m "Agregar tours reales"
git push             # Vercel reconstruye solo
```
