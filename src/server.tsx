import {
  createStartHandler,
  defaultStreamHandler,
  getWebRequest,
} from "@tanstack/react-start/server";

import { paraglideMiddleware } from "./paraglide/server.js";
import { overwriteGetLocale } from "./paraglide/runtime.js";
import { router } from "./router";

const startHandler = createStartHandler({
  createRouter: () => router,
})(defaultStreamHandler);

export default ({ request }: { request: Request }) => {
  console.log("Server handler called", new Date());
  console.log("Request URL:", request.url);
  return paraglideMiddleware(request, ({ locale, request }) => {
    overwriteGetLocale(() => locale);

    return startHandler({ request });
  });
};
