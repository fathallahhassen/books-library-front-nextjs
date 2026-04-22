export interface BookAuthor {
  name: string;
  birth_year: number;
  death_year: number;
}

export interface Book {
  id: number;
  title: string;
  authors: BookAuthor[];
  summaries: string[];
  editors: BookAuthor[];
  translators: BookAuthor[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

export interface BookResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[] | null;
}

export interface SavedBooksResponse {
  data: Book[];
  message: string;
  success: boolean;
}

export interface BulkInsertBooksResponse {
  data: {
    insertedIds: number[];
    ignoredIds: number[];
  };
  message: string;
  success: boolean;
}

export interface BulkDeleteBooksResponse {
  data: {
    deletedIds: number[];
    notFoundOrIgnored: number[];
  };
  message: string;
  success: boolean;
}