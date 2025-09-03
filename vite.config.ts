import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { paraglideVitePlugin as paraglide } from "@inlang/paraglide-js";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    paraglide({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["cookie", "url", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/about",
          localized: [
            ["en", "/en/about"],
            ["de", "/de/ueber"],
          ],
        },
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            ["de", "/de/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
