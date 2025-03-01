import { ParsedLocation, redirect } from "@tanstack/react-router";
import { getLocale, isLocale } from "~/paraglide/runtime";

function extractLocale(url: string) {
  const urlObj = new URL(url, "http://dummy.com");
  const pathSegments = urlObj.pathname.split("/").filter(Boolean);
  if (pathSegments.length > 0) {
    const potentialLocale = pathSegments[0];
    if (isLocale(potentialLocale)) {
      return potentialLocale;
    }
  }
}

export function redirectNoLocale(ctx: { location: ParsedLocation }) {
  const urlLocale = extractLocale(ctx.location.href);

  if (urlLocale) {
    return;
  }
  redirect({
    to: `/${getLocale()}${ctx.location.href}` as string,
    throw: true,
  });
}
