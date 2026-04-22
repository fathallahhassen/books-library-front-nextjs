import { memo, useState } from 'react';
import Image from 'next/image';
import { Book } from '@/types/book';
import styles from './BookCard.module.scss';

interface BookCardProps {
  book: Book;
  imageKey?: string;
  selected?: boolean;
  selectedLabel?: string;
  badgeVariant?: 'selected' | 'removal';
  onClick: (book: Book) => void;
}

const PLACEHOLDER_COVER = '/placeholder-cover.png';

export const BookCard = memo(
  ({
    book,
    imageKey = 'image/jpeg',
    selected = false,
    selectedLabel = 'Selected',
    badgeVariant = 'selected',
    onClick,
  }: BookCardProps) => {
    const handleClick = () => {
      onClick(book);
    };

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <article
        className={`${styles.card} ${selected ? styles.selected : ''}`}
        onClick={handleClick}
      >
        <div className={styles.cover}>
          <Image
            alt={book.title}
            src={imageError ? PLACEHOLDER_COVER : (book.formats?.[imageKey] ?? PLACEHOLDER_COVER)}
            width={300}
            height={200}
            className={styles.bookCover}
            onError={handleImageError}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
          />
        </div>

        <div className={styles.body}>
          <h2 className={styles.name}>{book.title}</h2>
        </div>

        {selected && (
          <span className={`${styles.badge} ${styles[`badge--${badgeVariant}`]}`}>
            {selectedLabel}
          </span>
        )}
      </article>
    );
  }
);

BookCard.displayName = 'BookCard';