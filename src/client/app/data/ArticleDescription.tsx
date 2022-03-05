/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx";
import type { SiteEntryMetadata } from "../../../server/files/types.ts";

import readJsonAPI from "./api/readJsonAPI.ts";

export default function Description() {
  const { slug = "about-me" } = useParams();
  const metadata = readJsonAPI<SiteEntryMetadata>("entries", slug);
  return <p>{metadata.subhead}</p>;
}
