export interface ArticleMetadata {
  title: string;
  description: string;
  category: string;
  tags: string[];
  series?: string;
}

export interface ArticleHandle {
  filename: string;
  content: string;
  metadata: ArticleMetadata;
}

export interface Game {
  title: string;
  description: string;
  slug: string;
  embedUrl: string;
  previewUrl: string;
  itchUrl: string;
}
