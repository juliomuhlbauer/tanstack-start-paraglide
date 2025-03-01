/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";

import { createRouter } from "./router";
import { paraglideMiddleware } from "./paraglide/server";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})((ctx) => paraglideMiddleware(ctx.request, () => defaultStreamHandler(ctx)));
