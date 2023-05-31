//import { cssBundleHref } from "@remix-run/css-bundle";
import style from './styles/style.css'
import styleSB from './styles/styleSB.css'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links = () => {
  return [
    { rel: "stylesheet", href: style },
    { rel: "stylesheet", href: styleSB },
  ]
};

function Document({title, children}) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document title='Inventory SES'>
      <Outlet/>
    </Document>
  );
}
