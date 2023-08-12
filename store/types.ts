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
  slug: string;
  media: Media[];
  created_at: string;
}

export interface ImageProps {
  id: number;
  height?: string;
  width?: string;
  public_id?: string;
  format?: string;
  blurDataUrl?: string;
  original_url?: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}
