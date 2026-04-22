'use client';

import { useEffect, useRef, useState } from 'react';
import { useBooksService } from '@/lib/useBooksService';
import { useBooksStore } from '@/store/booksStore';
import { BookCard, SearchBar, SelectionToolbar } from '@/components';
import { Book } from '@/types/book';
import styles from './page.module.scss';

export default function BooksListPage() {
    const {
        books,
        isLoading,
        isOperationLoading,
        searchBooks,
        loadBooks,
        loadMoreBooks,
        loadSavedBooksFromDatabase,
        saveBooksToDatabase,
    } = useBooksService();

    const { savedBooks, draftBooks, toggleDraftBook, clearDraftSelection } =
        useBooksStore();

    const [searchTerm, setSearchTerm] = useState('');
    const initRef = useRef(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initRef.current) return;
        initRef.current = true;

        loadBooks(true);
        clearDraftSelection();

        loadSavedBooksFromDatabase();
    }, [loadBooks, clearDraftSelection, loadSavedBooksFromDatabase]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreBooks();
            }
        });

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMoreBooks]);

    const submitSearch = () => {
        searchBooks(searchTerm);
    };

    const selectBook = (book: Book) => {
        if (savedBooks.some((b) => b.id === book.id)) {
            return;
        }
        toggleDraftBook(book);
    };

    const checkBookSelected = (book: Book): boolean => {
        return (
            draftBooks.some((b) => b.id === book.id) ||
            savedBooks.some((b) => b.id === book.id)
        );
    };

    const getSelectedLabel = (book: Book): string => {
        return savedBooks.some((b) => b.id === book.id) ? 'Saved' : 'Selected';
    };

    const handleSaveSelection = async () => {
        if (!draftBooks.length || isOperationLoading) {
            return;
        }

        const savedIds = await saveBooksToDatabase(draftBooks);
        if (!savedIds.length) {
            return;
        }

        await loadSavedBooksFromDatabase();
        clearDraftSelection();
    };

    return (
        <div className={styles.container}>
            <SelectionToolbar
                title="Books"
                subtitle="Pick books you like"
                saveLabel="Save selection"
                saveMode="draft"
                onSave={handleSaveSelection}
                isLoading={isOperationLoading}
            />

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onSubmit={submitSearch}
                placeholder="Search books..."
            />

            {isLoading && books.length === 0 ? (
                <div className={styles.loader}>Loading books...</div>
            ) : books.length > 0 ? (
                <>
                    <div className={styles.grid}>
                        {books.map((book, index) => (
                            <BookCard
                                key={index}
                                book={book}
                                selected={checkBookSelected(book)}
                                selectedLabel={getSelectedLabel(book)}
                                badgeVariant="selected"
                                onClick={selectBook}
                            />
                        ))}
                    </div>
                    {isLoading && <div className={styles.loader}>Loading more books...</div>}
                    <div ref={sentinelRef} className={styles.sentinel} />
                </>
            ) : (
                <div className={styles.loader}>No books found.</div>
            )}
        </div>
    );
}
