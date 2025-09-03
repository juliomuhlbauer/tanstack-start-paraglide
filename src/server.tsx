import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

import { paraglideMiddleware } from "./paraglide/server.js";
import { createRouter } from "./router.js";

const startHandler = createStartHandler({
  createRouter,
})(defaultStreamHandler);

export default {
  fetch(req: Request): Promise<Response> {
    return paraglideMiddleware(req, ({ request }) => startHandler(request));
  },
};
