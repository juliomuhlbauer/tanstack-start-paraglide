import { createFileRoute } from "@tanstack/react-router";
import { m } from "~/paraglide/messages.js";
import { getLocale } from "~/paraglide/runtime.js";
import { getServerMessage } from "~/serverFunctions/get-server-message";

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => {
    return {
      localeFromLoader: getLocale(),
      messageFromLoader: m.example_message({ username: "John Doe" }),
      serverFunctionMessage: getServerMessage({ data: "📩" }),
    };
  },
});

function Home() {
  const { serverFunctionMessage, messageFromLoader, localeFromLoader } =
    Route.useLoaderData();
  return (
    <div className="p-2">
      <h2>Locale from loader: {localeFromLoader}</h2>
      <h2>Message from loader: {messageFromLoader}</h2>
      <h2>Server function message: {serverFunctionMessage}:</h2>
      <h3>{m.example_message({ username: "John Doe" })}</h3>
      <h2>Locale from client: {getLocale()}</h2>
    </div>
  );
}
