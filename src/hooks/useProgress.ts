import { useCallback, useEffect, useRef, useState } from "react";

const KEY = "axcendra-growth-tracker-v1";

type Store = Record<string, boolean>;

type AnyStorage = {
  get?: (k: string) => unknown;
  set?: (k: string, v: string) => unknown;
};

function bridge(): AnyStorage | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { storage?: AnyStorage };
  return w.storage ?? null;
}

async function read(): Promise<Store> {
  try {
    const b = bridge();
    if (b?.get) {
      const raw = await b.get(KEY);
      if (typeof raw === "string") return JSON.parse(raw) as Store;
      if (raw && typeof raw === "object") return raw as Store;
    }
    const local = window.localStorage.getItem(KEY);
    return local ? (JSON.parse(local) as Store) : {};
  } catch {
    return {};
  }
}

async function write(value: Store) {
  const json = JSON.stringify(value);
  try {
    const b = bridge();
    if (b?.set) await b.set(KEY, json);
  } catch {
    /* ignore bridge failures, localStorage below is the fallback */
  }
  try {
    window.localStorage.setItem(KEY, json);
  } catch {
    /* storage unavailable */
  }
}

export function useProgress() {
  const [done, setDone] = useState<Store>({});
  const [loaded, setLoaded] = useState(false);
  const [savedAt, setSavedAt] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    let alive = true;
    read().then((v) => {
      if (!alive) return;
      setDone(v);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (first.current) {
      first.current = false;
      return;
    }
    write(done).then(() => setSavedAt(Date.now()));
  }, [done, loaded]);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, []);

  const reset = useCallback(() => setDone({}), []);

  return { done, toggle, reset, loaded, savedAt };
}
