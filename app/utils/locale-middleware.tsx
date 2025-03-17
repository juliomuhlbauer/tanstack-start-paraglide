import { createMiddleware } from "@tanstack/react-start";
import { AsyncLocalStorage } from 'node:async_hooks'
import { baseLocale, getLocale, Locale, overwriteGetLocale } from "~/paraglide/runtime.js";

export const localeMiddleware = createMiddleware()
  .client((context) => {
    return context.next({ sendContext: { locale: getLocale() } }) })
  .server(async (context) => {
    const storage = new AsyncLocalStorage<Locale>()
    overwriteGetLocale(() => storage.getStore() ?? baseLocale)
    return await storage.run(context.context.locale, async () => await context.next())
  });
