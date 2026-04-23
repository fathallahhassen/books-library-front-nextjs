import { BookResponse, SavedBooksResponse, BulkInsertBooksResponse, BulkDeleteBooksResponse, Book } from '@/types/book';
import { environment } from './environment';

export const api = {
  async getBooks(url: string, signal?: AbortSignal): Promise<BookResponse> {
    const response = await fetch(url, {
      cache: 'no-store',
      redirect: 'follow',
      signal,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }

    return response.json();
  },

  async getSavedBooks(query?: string): Promise<SavedBooksResponse> {
    const url = query
      ? `${environment.apiLocalDbUrl}/books/search?q=${encodeURIComponent(query)}`
      : `${environment.apiLocalDbUrl}/books`;
    
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch saved books: ${response.status}`);
    }

    return response.json();
  },

  async bulkCreateBooks(books: Book[]): Promise<BulkInsertBooksResponse> {
    const response = await fetch(`${environment.apiLocalDbUrl}/books/bulk-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: books }),
      cache: 'no-store',
    });

    if (!response.ok) throw new Error(`Failed to save books: ${response.status}`);
    return response.json();
  },

  async bulkDeleteBooks(ids: number[]): Promise<BulkDeleteBooksResponse> {
    const response = await fetch(`${environment.apiLocalDbUrl}/books/bulk-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
      cache: 'no-store',
    });

    if (!response.ok) throw new Error(`Failed to delete books: ${response.status}`);
    return response.json();
  },
};