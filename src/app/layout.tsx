import type { Metadata } from 'next';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Books Library',
  description: 'A books library application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <Link href="/" className="navbar-brand">
              Books Library
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/books" className="nav-link">
                  All Books
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/books/saved" className="nav-link">
                  Saved Books
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
