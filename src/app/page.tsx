import Link from 'next/link';
import styles from './page.module.scss';

export default function HomePage() {
    return (
        <div className="container">
            <h1>Books Library</h1>
            <p>Welcome to the Books Library application.</p>
            <div className="navLinks">
                <Link href="/books" className={styles.navLink}>
                    Browse Books
                </Link>
                <Link href="/books/saved" className={styles.navLink}>
                    Saved Books
                </Link>
            </div>
        </div>
    );
}
