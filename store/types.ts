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
