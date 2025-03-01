import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "vinxi/http";

import { paraglideMiddleware } from "~/paraglide/server.js";

export const localeMiddleware = createMiddleware().server((context) =>
  paraglideMiddleware(getWebRequest(), ({ request, locale }) =>
    context.next({ context: { locale, request } }),
  ),
);
