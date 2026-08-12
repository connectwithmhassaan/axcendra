import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/axcendra-logo.png.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        router.navigate({ to: "/unlock" });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3 shadow-soft backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo.url} alt="Axcendra logo" className="h-8 w-8" />
            <span className="font-display text-lg tracking-tight text-foreground">Axcendra</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-brand-soft text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Start a project
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="rounded-xl border border-border p-2 text-foreground md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-2 shadow-soft backdrop-blur-xl md:hidden"
            >
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "bg-brand-soft text-primary" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/50 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <img src={logo.url} alt="" className="h-7 w-7" />
          <span className="font-display text-base text-foreground">Axcendra</span>
        </div>
        <p className="text-sm text-muted-foreground">
          SEO and real estate copywriting that turns listings into leads.
        </p>
        <div className="flex flex-col gap-1 sm:items-end">
          <Link
            to="/unlock"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <Lock className="h-3.5 w-3.5" />
            Tracker
          </Link>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Axcendra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
