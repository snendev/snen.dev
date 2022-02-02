/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type {
  EntriesDetailResponse,
} from "../../../files/types.ts";

import readJsonAPI from "./api/readJsonAPI.ts";

interface PostDescriptionProps {
  slug?: string
}

export default function Description({ slug = "about" }: PostDescriptionProps) {
  const entry = readJsonAPI<EntriesDetailResponse>("entries", slug);
  return <p>{entry.metadata.subhead}</p>;
}
