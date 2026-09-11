import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { createAdminAccount } from "@/lib/admin-setup-fn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "setup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [setupCode, setSetupCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error: signInError } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (signInError) {
      setError(signInError.message ?? "No se pudo iniciar sesión.");
      return;
    }
    void navigate({ to: "/admin" });
  }

  async function onSetup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const result = await createAdminAccount({ data: { email, password, name, setupCode } });
    setBusy(false);
    if (!result.ok) {
      setError(
        result.reason === "wrong_code"
          ? "Código de configuración incorrecto."
          : result.reason === "not_configured"
            ? "ADMIN_SETUP_CODE no está configurado en el servidor."
            : "No se pudo crear la cuenta.",
      );
      return;
    }
    setMode("signin");
    setError("");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-10">
      <h1 className="font-display text-3xl tracking-tight">
        {mode === "signin" ? "Panel de Cuntours" : "Crear cuenta de administrador"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {mode === "signin"
          ? "Inicia sesión para ver las reservas."
          : "Solo una vez — usa el código de configuración que pusiste en Vercel."}
      </p>

      <form onSubmit={mode === "signin" ? onSignIn : onSetup} className="mt-6 space-y-4">
        {mode === "setup" ? (
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        ) : null}
        <div>
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            className="mt-1.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            className="mt-1.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {mode === "setup" ? (
          <div>
            <Label htmlFor="setupCode">Código de configuración</Label>
            <Input
              id="setupCode"
              type="password"
              className="mt-1.5"
              value={setupCode}
              onChange={(e) => setSetupCode(e.target.value)}
              required
            />
          </div>
        ) : null}

        {error ? <p className="text-sm text-warn">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Un momento…" : mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
        </Button>
      </form>

      <button
        type="button"
        className="mt-6 text-xs text-muted underline-offset-4 hover:underline"
        onClick={() => {
          setMode(mode === "signin" ? "setup" : "signin");
          setError("");
        }}
      >
        {mode === "signin" ? "¿Primera vez? Crear la cuenta de administrador" : "Ya tengo cuenta — iniciar sesión"}
      </button>
    </main>
  );
}
