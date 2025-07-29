import { createIsomorphicFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import {
  extractLocaleFromRequestAsync,
  getLocale,
} from "~/paraglide/runtime.js";

export const resolveLocale = createIsomorphicFn()
  .client(getLocale)
  .server(() => extractLocaleFromRequestAsync(getWebRequest()));
