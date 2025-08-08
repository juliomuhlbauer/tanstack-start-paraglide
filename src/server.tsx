import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

import { paraglideMiddleware } from "./paraglide/server.js";
import { router } from "./router";

const startHandler = createStartHandler({
  createRouter: () => router,
})(defaultStreamHandler);

export default ({ request }: { request: Request }) => {
  console.log("[Original] Request URL:", request.url);

  return paraglideMiddleware(request, ({ request }) => {
    console.log("[Modified] Request URL", request.url);

    return startHandler({ request });
  });
};
