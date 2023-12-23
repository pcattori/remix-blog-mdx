import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ReactNode } from "react";

import "~/tailwind.css";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "border-b-2 border-cyan-700" : "";

const Layout = (props: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <header className="w-full max-w-7xl mx-auto p-10 border-b border-gray-100">
      <nav>
        <ul className="flex gap-16 text-lg font-semibold">
          <li>
            <NavLink to="/" className={navLinkClass}>
              home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={navLinkClass}>
              blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              about
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <main className="w-full max-w-7xl mx-auto flex-1 flex">
      {props.children}
    </main>
    <footer className="w-full max-w-7xl mx-auto p-10 flex justify-center">
      <span className="text-sm text-gray-500">
        Illustrations by{" "}
        <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">
          Icons 8
        </a>{" "}
        from <a href="https://icons8.com/illustrations">Ouch!</a>
      </span>
    </footer>
  </div>
);

export const meta: MetaFunction = () => [
  { title: "Remix 🤝 MDX" },
  {
    name: "description",
    content: "Template showing off Remix's new MDX capabilities",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
