/** @jsx React.createElement */
import React from "../react.ts";

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
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>snen.dev</title>
        <style
          // set dangerously to avoid HTML escapes
          dangerouslySetInnerHTML={{ __html: RESET_STYLE }}
        />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/colors.css" />
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
