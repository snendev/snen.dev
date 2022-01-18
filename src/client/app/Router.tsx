/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import Article from "./Article.tsx";
import Feed from "./Feed.tsx";


function Redirect() {
  React.useEffect(() => {
    window.location.assign("/")
  }, [])
  return null
}

interface RouterProps {
  url: URL;
}

export default function Router({ url }: RouterProps) {
  const [, category, slug] = url.pathname.split("/");

  const BodyComponent = slug === undefined ? Feed : Article;

  switch (category) {
    case "": return <BodyComponent slug={slug} />
    case "about":
    case "read":
    case "tech":
    case "media": return <BodyComponent slug={slug} feed={category} />
    default: return <Redirect />
  }
}
