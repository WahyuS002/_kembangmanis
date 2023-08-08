export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface Media {
  id: number;
  original_url: string;
}

export interface Post {
  author: Author;
  created_at: string;
  title: string;
  slug: string;
  thumbnail: string;
  media?: Media[];
  content?: string;
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  prevPageUrl?: boolean;
  nextPageUrl?: boolean;
}

export interface Gallery {
  title: string;
  media: Media[];
}
