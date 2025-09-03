import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => {
        const delocalizedUrl = deLocalizeUrl(url);

        console.log("rewrite input", url.pathname, delocalizedUrl.pathname);

        return deLocalizeUrl(url);
      },
      output: ({ url }) => {
        const localizedUrl = localizeUrl(url);

        console.log("rewrite output", url.pathname, localizedUrl.pathname);

        return localizedUrl;
      },
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
