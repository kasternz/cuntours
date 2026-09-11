import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LastMinuteStrip } from "@/components/last-minute-strip";
import { I18nProvider } from "@/i18n/context";
import { getToursFn } from "@/lib/tours-fn";
import appCss from "../styles.css?url";

const APP_NAME = "Cuntours";

export const Route = createRootRoute({
  loader: async () => ({ tours: await getToursFn() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Cuntours: tours en Cancún y Riviera Maya. Actividades acuáticas, zonas arqueológicas y ofertas de último día con compra directa.",
      },
      { name: "theme-color", content: "#0D6E6A" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="es" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-ink">
        <PreviewHostBridge />
        <I18nProvider>
          <AuthProvider>
            <SiteHeader />
            <LastMinuteStrip />
            <Outlet />
            <SiteFooter />
          </AuthProvider>
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  );
}
