import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { strategy } from "./paraglide/runtime";
import { extractLocale } from "./utils/extract-locale";

export function createRouter(pathname?: string) {
  const extractedLocale = extractLocale(pathname ?? "/");
  const basepath =
    strategy.includes("url") && extractedLocale
      ? `/${extractedLocale}`
      : undefined;

  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    basepath,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
