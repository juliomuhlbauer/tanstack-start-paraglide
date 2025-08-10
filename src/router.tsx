import {
  createBrowserHistory,
  createRouter as createTanStackRouter,
  RouterHistory,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { createIsomorphicFn } from "@tanstack/react-start";
import { deLocalizeHref, localizeHref } from "./paraglide/runtime";

function createHistory(): RouterHistory {
  return createBrowserHistory({
    parseLocation: () => {
      return {
        pathname: deLocalizeHref(window.location.pathname),
        href: deLocalizeHref(window.location.href),
        search: window.location.search,
        hash: window.location.hash,
        state: window.history.state,
      };
    },
    createHref: (href) => {
      console.log("unparsed", href);
      console.log("parsed", localizeHref(href));

      return localizeHref(href);
    },
  });
}

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    history: createIsomorphicFn()
      .client(createHistory)
      .server(() => undefined)(),
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
