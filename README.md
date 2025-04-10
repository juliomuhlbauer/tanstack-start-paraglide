## TanStack Start with Paraglide v2 Template

This repository is a template for starting projects with TanStack Start using Paraglide v2. It provides a pre-configured setup to quickly get you up.

## Limitations

Because TanStack Router does not support optional route params, I implemented small helper functions that dynamically replace basepath of the router (`/app/router.tsx`) based on detected language params. This is automatically disabled, if you don't use the `url` strategy in your Paraglide config.

```ts
// /app/router.tsx

import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { getRouterBasepath } from "./utils/router-basepath";

export function createRouter(pathname?: string) {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    basepath: getRouterBasepath(pathname),
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

```

`paraglideMiddleware()` does not work well with API routes if you use the `url` strategy. If you want to use Paraglide with API routes, but you use the `url` for your project, and you encounter issues, either setup a separate Paraglide project for your API routes without the `url` strategy, and change the import path in the `/app/api.ts` file, or implement a custom strategy.

## How it's implemented?

The `paraglideMiddleware()` from the `/app/paraglide/server.js` in `/app/ssr.tsx` and the middleware has to stay there to make sure the package works. The same middleware is also used in `/app/api.ts` so you can use the package with API routes, although it's completely optional, so feel free to remove it if you don't need it. **The `url` strategy DOES NOT work with API routes.**

By default, the `localeMiddleware()` is enabled in `/app/global-middleware.ts`. What it does is it passes information about used language from the client to all server functions. If you don't use Paraglide with server functions, feel free to remove it.

## Link component

You can use the `Link` component provided by TanStack Router as it is. No changes are required. If you use the `url` strategy, you can use the `localizeHref()` function provided in `/app/paraglide/runtime.js` with the `Link` component or `setLocale()` no matter what strategy you're using.

## Development

From your terminal:

```sh
pnpm install
pnpm dev
```

If you want to use `yarn`, `npm` or any other package manager, delete the `pnpm-lock.yaml` file and run:

```sh
# with npm
npm install
npm run dev

# with yarn
yarn install
yarn run dev
```
