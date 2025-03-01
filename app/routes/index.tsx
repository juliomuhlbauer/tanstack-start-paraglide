import { createFileRoute } from "@tanstack/react-router";
import { m } from "~/paraglide/messages.js";
import { locales, setLocale } from "~/paraglide/runtime";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3 className={"text-red-500"}>
        {m.example_message({ username: "John Doe" })}
      </h3>
      {locales.map((locale) => (
        <button
          onClick={() => setLocale(locale)}
          key={locale}
          className={`px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold m-2`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
