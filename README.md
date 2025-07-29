## TanStack Start with Paraglide v2 Template

This repository is a template for starting projects with TanStack Start using Paraglide v2. It provides a pre-configured setup to quickly get you up.

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
