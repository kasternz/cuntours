import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { checkAdminAccessFn } from "@/lib/auth/admin-access-fn";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  return <AdminGate />;
}

function AdminGate() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    checkAdminAccessFn()
      .then((res) => setAuthorized(res.authorized))
      .catch(() => setError("No se pudo verificar el acceso."));
  }, []);

  if (error) {
    return <p className="mx-auto max-w-lg px-4 py-20 text-center text-sm text-warn">{error}</p>;
  }
  if (authorized === null) {
    return <p className="mx-auto max-w-lg px-4 py-20 text-center text-sm text-muted">Cargando…</p>;
  }
  if (!authorized) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-2xl tracking-tight">Acceso restringido</h1>
        <p className="mt-3 text-muted">
          Esta cuenta no tiene permiso para administrar Cuntours. Contacta al administrador.
        </p>
      </main>
    );
  }

  const tab = (to: string, label: string) => {
    const active = to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
    return (
      <Link
        to={to}
        className={`h-10 rounded-[var(--radius-sm)] px-3 text-sm font-medium leading-10 ${
          active ? "bg-teal text-foam" : "text-ink-soft"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          {tab("/admin", "Reservas")}
          {tab("/admin/tours", "Tours")}
        </div>
        <UserButton />
      </div>
      <div className="mt-6">
        <Outlet />
      </div>
    </main>
  );
}
