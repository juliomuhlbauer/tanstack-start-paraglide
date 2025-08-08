import {
  createBrowserHistory,
  createRouter as createTanStackRouter,
  HistoryLocation,
  HistoryState,
  RouterHistory,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { createIsomorphicFn } from "@tanstack/react-start";
import { deLocalizeHref, localizeHref } from "./paraglide/runtime";

function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

type ParsedHistoryState = HistoryState & {
  key?: string; // TODO: Remove in v2 - use __TSR_key instead
  __TSR_key?: string;
  __TSR_index: number;
};

const stateIndexKey = "__TSR_index";

function parseHref(
  href: string,
  state: ParsedHistoryState | undefined
): HistoryLocation {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");

  const addedKey = createRandomKey();

  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0
        ? searchIndex > 0
          ? Math.min(hashIndex, searchIndex)
          : hashIndex
        : searchIndex > 0
          ? searchIndex
          : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search:
      searchIndex > -1
        ? href.slice(searchIndex, hashIndex === -1 ? undefined : hashIndex)
        : "",
    state: state || { [stateIndexKey]: 0, key: addedKey, __TSR_key: addedKey },
  };
}

function createHistory(opts?: { window?: any }): RouterHistory {
  // const win =
  //   opts?.window ??
  //   (typeof document !== "undefined" ? window : (undefined as any));

  return createBrowserHistory({
    // window: win,
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
