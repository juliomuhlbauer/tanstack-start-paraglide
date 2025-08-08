import { createFileRoute, Link } from "@tanstack/react-router";
import { m } from "~/paraglide/messages.js";
import { getLocale, locales, setLocale } from "~/paraglide/runtime.js";
import { getServerMessage } from "~/serverFunctions/get-server-message";

export const Route = createFileRoute("/{-$locale}/")({
  component: Home,
  loader: () => {
    console.log("loader called", new Date());

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

      <Link
        to="/{-$locale}/about"
        className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold m-2"
      >
        About page
      </Link>
    </div>
  );
}
