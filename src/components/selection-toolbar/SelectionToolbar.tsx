'use client';

import { useRouter } from 'next/navigation';
import { useBooksStore } from '@/store/booksStore';
import styles from './SelectionToolbar.module.scss';

interface SelectionToolbarProps {
  title: string;
  subtitle: string;
  saveLabel?: string;
  saveMode?: 'draft' | 'saved';
  onSave: () => void;
  isLoading?: boolean;
}

export const SelectionToolbar = ({
  title,
  subtitle,
  saveLabel = 'Save selection',
  saveMode = 'draft',
  onSave,
  isLoading = false,
}: SelectionToolbarProps) => {
  const router = useRouter();
  const { draftBooks, removeDraftBooks, getSavedCount, hasDraftSelection, hasRemoveDraftSelection } =
    useBooksStore();

  const saveEnabled = saveMode === 'draft' ? hasDraftSelection() : hasRemoveDraftSelection();

  const viewSelection = () => {
    router.push('/books/saved');
  };

  const handleSave = () => {
    onSave();
  };

  const getBadgeCount = () => {
    return saveMode === 'draft' ? draftBooks.length : removeDraftBooks.length;
  };

  return (
    <div className={styles.toolbar}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.actions}>
        {saveMode === 'draft' && (
          <button className={styles.viewButton} type="button" onClick={viewSelection}>
            View selection
            {getSavedCount() > 0 && (
              <span className={styles.badge}>{getSavedCount()}</span>
            )}
          </button>
        )}

        <button
          className={saveEnabled ? styles.saveButton : styles.disabledButton}
          type="button"
          disabled={!saveEnabled || isLoading}
          onClick={handleSave}
        >
          {isLoading ? 'Saving...' : saveLabel}
          {!isLoading && getBadgeCount() > 0 && (
            <span className={styles.badge}>{getBadgeCount()}</span>
          )}
        </button>
      </div>
    </div>
  );
};