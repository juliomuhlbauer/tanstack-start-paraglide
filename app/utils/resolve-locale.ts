import { createIsomorphicFn, createServerFn } from "@tanstack/react-start";
import { baseLocale, getLocale, Locale } from "~/paraglide/runtime.js";

import { paraglideMiddleware } from "~/paraglide/server.js";

export const resolveLocale = createIsomorphicFn()
  .client(async () => getLocale())
  .server(async () => {
    const { getWebRequest } = await import("@tanstack/react-start/server");
    const request = getWebRequest();

    if (!request) {
      return baseLocale;
    }

    return await new Promise<Locale>((resolve) =>
      paraglideMiddleware(request, async ({ locale }) => {
        resolve(locale);
      }),
    );
  });
