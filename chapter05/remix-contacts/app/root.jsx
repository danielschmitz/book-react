import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navigator from "./components/Navigator";
import ThemeSwitcher from "./components/ThemeSwitcher";
import globalStyles from "./global.css";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{
    rel: "stylesheet",
    href: "https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
  },
  {
    rel: "stylesheet",
    href: globalStyles
  }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navigator />
        <div className="container">
          <Outlet/>
        </div>
        <ThemeSwitcher/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
