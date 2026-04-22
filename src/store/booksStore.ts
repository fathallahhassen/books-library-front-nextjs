import {create} from 'zustand';
import {Book} from '@/types/book';

interface BooksState {
    books: Book[];
    savedBooks: Book[];
    draftBooks: Book[];
    removeDraftBooks: Book[];
    isLoading: boolean;
    isOperationLoading: boolean;
    nextUrl: string | null;
    error: string | null;

    setBooks: (books: Book[], nextUrl: string | null) => void;
    appendBooks: (books: Book[], nextUrl: string | null) => void;
    setSavedBooks: (books: Book[]) => void;
    toggleDraftBook: (book: Book) => void;
    toggleRemoveDraftBook: (book: Book) => void;
    clearDraftSelection: () => void;
    syncDraftFromSaved: () => void;
    setLoading: (isLoading: boolean) => void;
    setOperationLoading: (isOperationLoading: boolean) => void;
    setError: (error: string | null) => void;
    resetRequest: () => void;
    getDraftCount: () => number;
    getRemoveDraftCount: () => number;
    getSavedCount: () => number;
    hasDraftSelection: () => boolean;
    hasRemoveDraftSelection: () => boolean;
}

export const useBooksStore = create<BooksState>((set, get) => ({
    books: [],
    savedBooks: [],
    draftBooks: [],
    removeDraftBooks: [],
    isLoading: false,
    isOperationLoading: false,
    nextUrl: null,
    error: null,

    setBooks: (books, nextUrl) => {
        set({books, nextUrl});
    },

    appendBooks: (books, nextUrl) => {
        set((state) => ({books: [...state.books, ...books], nextUrl}));
    },

    setSavedBooks: (books) =>
        set((state) => ({
            savedBooks: books,
            removeDraftBooks: state.removeDraftBooks.filter((book) =>
                books.some((saved) => saved.id === book.id)
            ),
        })),

    toggleDraftBook: (book) =>
        set((state) => {
            const exists = state.draftBooks.some((b) => b.id === book.id);
            return {
                draftBooks: exists
                    ? state.draftBooks.filter((b) => b.id !== book.id)
                    : [...state.draftBooks, book],
            };
        }),

    toggleRemoveDraftBook: (book) =>
        set((state) => {
            const exists = state.removeDraftBooks.some((b) => b.id === book.id);
            return {
                removeDraftBooks: exists
                    ? state.removeDraftBooks.filter((b) => b.id !== book.id)
                    : [...state.removeDraftBooks, book],
            };
        }),

    clearDraftSelection: () =>
        set({draftBooks: [], removeDraftBooks: []}),

    syncDraftFromSaved: () =>
        set((state) => ({
            draftBooks: [...state.savedBooks],
            removeDraftBooks: [],
        })),

    setLoading: (isLoading) => set({isLoading}),

    setOperationLoading: (isOperationLoading) => set({isOperationLoading}),

    setError: (error) => set({error}),

    resetRequest: () =>
        set({books: [], nextUrl: null, error: null}),

    getDraftCount: () => get().draftBooks.length,

    getRemoveDraftCount: () => get().removeDraftBooks.length,

    getSavedCount: () => get().savedBooks.length,

    hasDraftSelection: () => get().draftBooks.length > 0,

    hasRemoveDraftSelection: () => get().removeDraftBooks.length > 0,
}));
