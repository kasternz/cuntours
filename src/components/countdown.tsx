import { useEffect, useState } from "react";

function deadlineFor(departs: "hoy" | "manana") {
  const d = new Date();
  if (departs === "manana") d.setDate(d.getDate() + 1);
  d.setHours(18, 0, 0, 0);
  if (d.getTime() < Date.now()) d.setHours(23, 59, 59, 0);
  return d;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown({ departs }: { departs: "hoy" | "manana" }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const ms = Math.max(0, deadlineFor(departs).getTime() - now);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);

  return (
    <span className="tabular-nums">
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
