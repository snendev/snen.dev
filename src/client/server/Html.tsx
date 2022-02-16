/** @jsx React.createElement */
import React from "../../deps/react.ts";

// Reset some browser default CSS.
const RESET_STYLE = `
  html, body {
    padding: 0;
    margin: 0;
  }
`;

interface HtmlProps {
  children: React.ReactNode;
}

export default function Html({ children }: HtmlProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="snen.dev is a website where I post my work, including experiments, tools, guides, and more."
        />
        <link rel="shortcut icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐧</text></svg>" />
        <title>snen.dev</title>
        <style
          // set dangerously to avoid HTML escapes
          dangerouslySetInnerHTML={{ __html: RESET_STYLE }}
        />
        <script type="module" src="/entrypoint.js" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/theme.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/fontawesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/brands.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/solid.min.css"
        />
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
