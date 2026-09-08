import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-teal-deep text-foam">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-tight">Cuntours</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-foam/75">
            Operadora local en Cancún. Tours acuáticos y arqueológicos con compra
            directa, sin marketplace.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm text-foam/80">
            <li>
              <Link to="/tours" className="hover:text-foam">
                Todos los tours
              </Link>
            </li>
            <li>
              <a href="/tours?cat=acuatico" className="hover:text-foam">
                Actividades acuáticas
              </a>
            </li>
            <li>
              <a href="/tours?cat=arqueologico" className="hover:text-foam">
                Tours arqueológicos
              </a>
            </li>
            <li>
              <Link to="/resenas" className="hover:text-foam">
                Reseñas de viajeros
              </Link>
            </li>
            <li>
              <a href="/#ultimo-dia" className="hover:text-foam">
                Ofertas de último día
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Operación</p>
          <p className="mt-3 text-sm leading-relaxed text-foam/75">
            Cancún, Quintana Roo
            <br />
            Recogida en zona hotelera, downtown y Riviera Maya
            <br />
            Cancelación gratis hasta 24 h antes
          </p>
        </div>
      </div>
      <div className="border-t border-foam/10 px-4 py-4 text-center text-xs text-foam/55">
        Cuntours · Cancún tours · reseñas de viajeros al estilo de las plataformas de la Riviera Maya.
      </div>
    </footer>
  );
}
