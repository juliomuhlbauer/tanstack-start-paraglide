import { createServerFn } from "@tanstack/react-start";
import { m } from "~/paraglide/messages.js";
import { localeMiddleware } from "~/utils/locale-middleware";

export const getServerMessage = createServerFn()
  .middleware([localeMiddleware])
  .validator((emoji: string) => emoji)
  .handler((ctx) => {
    return m.server_message({ emoji: ctx.data });
  });
