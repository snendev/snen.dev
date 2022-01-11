import { SiteEntryMetadata } from "./loadEntries.ts";

export type EntriesListResponse = SiteEntryMetadata[];
export interface EntriesDetailResponse {
  content: string;
  metadata: SiteEntryMetadata;
}
