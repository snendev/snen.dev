/** @jsx React.createElement */
import React from "react";

// Reset some browser default CSS.
const RESET_STYLE = `
  html, body {
    padding: 0;
    margin: 0;
  }
`;

interface HtmlProps {
  entrypoint: React.ReactNode;
  children: React.ReactNode;
}

export default function Html({ children, entrypoint }: HtmlProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <title>Deno React18 Test</title>
        {entrypoint}
        <style
          // set dangerously to avoid HTML escapes
          dangerouslySetInnerHTML={{ __html: RESET_STYLE }}
        />
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
