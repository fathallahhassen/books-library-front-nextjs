import {useCallback, useRef} from 'react';
import {api} from '@/lib/api';
import {environment} from '@/lib/environment';
import {useBooksStore} from '@/store/booksStore';
import {Book} from '@/types/book';

export const useBooksService = () => {
    const {
        books,
        isLoading,
        isOperationLoading,
        error,
        nextUrl,
        setBooks,
        appendBooks,
        setLoading,
        setOperationLoading,
        setError,
        resetRequest,
        setSavedBooks,
    } = useBooksStore();

    const controllerRef = useRef<AbortController | null>(null);
    const requestVersionRef = useRef(0);

    const loadBooks = useCallback(
        async (reset = false, queryOverride?: string) => {
            if (!reset && (isLoading || !nextUrl)) return;

            const newRequestVersion = requestVersionRef.current + 1;
            requestVersionRef.current = newRequestVersion;
            controllerRef.current?.abort();
            const controller = new AbortController();
            controllerRef.current = controller;
            setLoading(true);
            setError(null);

            let url: string;
            const useNextUrl = !reset && nextUrl;
            if (useNextUrl) {
                url = nextUrl;
            } else {
                const activeQuery = queryOverride;
                const searchParam = activeQuery ? `search=${encodeURIComponent(activeQuery)}` : '';
                url = searchParam
                    ? `${environment.apiBaseUrl}/books?${searchParam}`
                    : `${environment.apiBaseUrl}/books`;
            }

            try {
                const response = await api.getBooks(url, controller.signal);
                if (newRequestVersion !== requestVersionRef.current) return;

                const results = response?.results ?? [];

                if (reset) {
                    setBooks(results, response.next);
                } else {
                    appendBooks(results, response.next);
                }
            } catch (error) {
                if ((error as Error).name === 'AbortError') return;
                if (newRequestVersion !== requestVersionRef.current) return;
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                if (controllerRef.current === controller) {
                    controllerRef.current = null;
                }
                if (newRequestVersion === requestVersionRef.current) {
                    setLoading(false);
                }
            }
        },
        [isLoading, nextUrl, setBooks, appendBooks, setLoading, setError]
    );

    const loadMoreBooks = useCallback(() => {
        if (nextUrl && !isLoading) {
            loadBooks(false);
        }
    }, [nextUrl, isLoading, loadBooks]);

    const searchBooks = useCallback(
        (query: string) => {
            const normalizedQuery = query.trim();
            if (normalizedQuery.length < 2 || normalizedQuery.length > 100) return;
            if (normalizedQuery === '' && books.length > 0) return;

            resetRequest();
            loadBooks(true, normalizedQuery);
        },
        [books.length, resetRequest, loadBooks]
    );

    const loadSavedBooksFromDatabase = useCallback(
        async (query?: string): Promise<Book[]> => {
            try {
                const response = await api.getSavedBooks(query?.trim());
                const savedBooks = response.data ?? [];
                setSavedBooks(savedBooks);
                return savedBooks;
            } catch {
                return [];
            }
        },
        [setSavedBooks]
    );

    const saveBooksToDatabase = useCallback(
        async (booksToSave: Book[]): Promise<number[]> => {
            if (!booksToSave.length || isOperationLoading) return [];

            setOperationLoading(true);
            try {
                const response = await api.bulkCreateBooks(booksToSave);
                const {insertedIds = [], ignoredIds = []} = response.data ?? {};
                return [...insertedIds, ...ignoredIds];
            } catch {
                return [];
            } finally {
                setOperationLoading(false);
            }
        },
        [isOperationLoading, setOperationLoading]
    );

    const deleteBooksFromDatabase = useCallback(
        async (bookIds: number[]): Promise<number[]> => {
            if (!bookIds.length || isOperationLoading) return [];

            setOperationLoading(true);
            try {
                const response = await api.bulkDeleteBooks(bookIds);
                return response.data?.deletedIds ?? [];
            } catch {
                return [];
            } finally {
                setOperationLoading(false);
            }
        },
        [isOperationLoading, setOperationLoading]
    );

    return {
        books,
        isLoading,
        isOperationLoading,
        error,
        hasMore: nextUrl !== null,
        searchBooks,
        loadBooks,
        loadMoreBooks,
        loadSavedBooksFromDatabase,
        saveBooksToDatabase,
        deleteBooksFromDatabase,
    };
};
