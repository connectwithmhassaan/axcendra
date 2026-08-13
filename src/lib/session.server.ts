import { useSession } from "@tanstack/react-start/server";

export type GateSession = { unlocked?: boolean };

export function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "axcendra-tracker",
    maxAge: 60 * 60 * 24 * 30,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

export async function getGateSession() {
  return useSession<GateSession>(sessionConfig());
}

export async function isUnlocked() {
  const session = await getGateSession();
  return Boolean(session.data.unlocked);
}
