import { createFileRoute } from "@tanstack/react-router";
import { m } from "~/paraglide/messages.js";
import { getLocale, locales, setLocale } from "~/paraglide/runtime.js";
import { getServerMessage } from "~/serverFunctions/get-server-message";

export const Route = createFileRoute("/{-$locale}/posts")({
  component: Home,
  loader: () => {
    const allPosts = [
      {
        id: "1",
        title: "First Post",
        content: "This is the content of the first post.",
        language: "en",
      },
      {
        id: "2",
        title: "Second Post",
        content: "This is the content of the second post.",
        language: "en",
      },
      {
        id: "3",
        title: "Dritter Beitrag",
        content: "Dies ist der Inhalt des dritten Beitrags.",
        language: "de",
      },
    ];

    const locale = getLocale();

    const localizedPosts = allPosts.filter((post) => post.language === locale);

    return { locale, localizedPosts };
  },
});

function Home() {
  const { locale, localizedPosts } = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>{m.example_message({ username: "John Doe" })}</h3>

      <h2>
        Posts in <strong>{locale}</strong>:
      </h2>

      <ul className="space-y-2">
        {localizedPosts.map((post) => (
          <li key={post.id}>
            <h4 className="font-bold">{post.title}</h4>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

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
