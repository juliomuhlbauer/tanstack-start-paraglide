import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

import { paraglideMiddleware } from "./paraglide/server.js";
import { createRouter } from "./router.js";

const startHandler = createStartHandler({
  createRouter,
})(defaultStreamHandler);

export default ({ request }: { request: Request }) =>
  paraglideMiddleware(request, ({ request }) => startHandler({ request }));
