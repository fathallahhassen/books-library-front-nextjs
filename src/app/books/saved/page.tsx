'use client';

import {useEffect, useState} from 'react';
import {useBooksService} from '@/lib/useBooksService';
import {useBooksStore} from '@/store/booksStore';
import {BookCard, SearchBar, SelectionToolbar} from '@/components';
import {Book} from '@/types/book';
import styles from '../page.module.scss';

export default function SavedBooksPage() {
    const {loadSavedBooksFromDatabase, deleteBooksFromDatabase, isOperationLoading} =
        useBooksService();

    const {
        savedBooks,
        removeDraftBooks,
        toggleRemoveDraftBook,
        syncDraftFromSaved,
        getSavedCount,
    } = useBooksStore();

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadSavedBooksFromDatabase().then(() => {
            syncDraftFromSaved();
        });
    }, [loadSavedBooksFromDatabase, syncDraftFromSaved]);

    const submitSavedSearch = async () => {
        await loadSavedBooksFromDatabase(searchTerm);
        syncDraftFromSaved();
    };

    const isMarkedForRemoval = (book: Book): boolean => {
        return removeDraftBooks.some((b) => b.id === book.id);
    };

    const handleUnsaveSelection = async () => {
        if (!removeDraftBooks.length || isOperationLoading) {
            return;
        }

        const deletedIds = await deleteBooksFromDatabase(
            removeDraftBooks.map((book) => book.id)
        );
        if (!deletedIds.length) {
            return;
        }

        await loadSavedBooksFromDatabase(searchTerm);
        syncDraftFromSaved();
    };

    const hasSavedBooks = savedBooks.length > 0;

    return (
        <div className={styles.container}>
            <SelectionToolbar
                title="Saved books"
                subtitle="Your current saved selection"
                saveLabel="Unsave selected books"
                saveMode="saved"
                onSave={handleUnsaveSelection}
                isLoading={isOperationLoading}
            />

            <p style={{marginBottom: 16}}>
                Total saved books: <strong>{getSavedCount()}</strong>
            </p>

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onSubmit={submitSavedSearch}
                placeholder="Search saved books..."
            />

            {!hasSavedBooks ? (
                <div className={styles.loader}>No saved books found.</div>
            ) : (
                <div className={styles.grid}>
                    {savedBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            selected={isMarkedForRemoval(book)}
                            selectedLabel="Marked for removal"
                            badgeVariant="Removal"
                            onClick={toggleRemoveDraftBook}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
