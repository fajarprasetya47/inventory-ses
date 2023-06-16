//import { cssBundleHref } from "@remix-run/css-bundle";
import Error from './components/Error';
import style from './styles/style.css'
import styleSB from './styles/styleSB.css'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

export const links = () => {
  return [
    { rel: "stylesheet", href: style },
    { rel: "stylesheet", href: styleSB },
  ]
};

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document title='Inventory SES'>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  return (
    <Document title={caughtResponse?.statusText}>
      <main>
        <Error title={caughtResponse?.statusText}>
          <p>{caughtResponse.data?.message || 'Something went wrong. Please try again later.'}</p>
          <p><a href='/'>Back</a></p>
        </Error>
      </main>
    </Document>
  )
}

export function ErrorBoundary({error}) {
  return (
    <Document title="An error occured">
      <main>
        <Error title="An error occured">
          <p>{error?.message || 'Something went wrong. Please try again later.'}</p>
          <p><a href='/'>Back</a></p>
        </Error>
      </main>
    </Document>
  )
}
