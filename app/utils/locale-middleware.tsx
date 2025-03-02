import { createMiddleware } from "@tanstack/react-start";
import { getLocale, overwriteGetLocale } from "~/paraglide/runtime.js";

export const localeMiddleware = createMiddleware()
  .client((context) => context.next({ sendContext: { locale: getLocale() } }))
  .server((context) => {
    overwriteGetLocale(() => context.context.locale);
    return context.next();
  });
