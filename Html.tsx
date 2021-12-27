/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'https://esm.sh/react@rc';

const PRELOAD_SCRIPT = `
  import React from \"https://esm.sh/react@rc\";
  import { hydrateRoot } from \"https://esm.sh/react-dom@rc\";

  import App from \"./App.tsx\";

  const root = hydrateRoot(
    document.body,
    React.createElement(App, { url: new URL(window.location) })
  )
`;

const RESET_STYLE = `
  html, body {
    padding: 0;
    margin: 0;
  }
`

function PrefetchLinks() {
  return (
    <>
      <link rel="prefetch" href="App.tsx" />
      <link rel="prefetch" href="Comments.tsx" />
    </>
  )
}

interface HtmlProps {
  children: React.ReactNode
}

export default function Html({children}: HtmlProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <PrefetchLinks />
        <title>Deno React18 Test</title>
        <script
          type="module"
          // set dangerously to avoid HTML escapes
          dangerouslySetInnerHTML={{__html: PRELOAD_SCRIPT }}
        />
        <style
          // set dangerously to avoid HTML escapes
          dangerouslySetInnerHTML={{__html: RESET_STYLE }}
        />
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`
          }}
        />
        {children}
      </body>
    </html>
  )
}
