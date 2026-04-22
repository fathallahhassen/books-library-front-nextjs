import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Books Library</h1>
      <p>Welcome to the Books Library application.</p>
      <div className="nav-links">
        <Link href="/books" className="nav-link">
          Browse Books
        </Link>
        <Link href="/books/saved" className="nav-link">
          Saved Books
        </Link>
      </div>
    </div>
  );
}
