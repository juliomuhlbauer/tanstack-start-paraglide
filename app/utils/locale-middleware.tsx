import { createMiddleware } from "@tanstack/react-start";
import {
  getLocale,
  Locale,
  overwriteGetLocale,
  setLocale as baseSetLocale,
} from "~/paraglide/runtime.js";

export let inMemoryLocale: Locale | undefined;

export function setLocale(locale: Locale) {
  baseSetLocale(locale);
  inMemoryLocale = locale;
}

export const localeMiddleware = createMiddleware()
  .client((context) =>
    context.next({ sendContext: { locale: inMemoryLocale ?? getLocale() } }),
  )
  .server((context) => {
    overwriteGetLocale(() => context.context.locale);
    return context.next();
  });
