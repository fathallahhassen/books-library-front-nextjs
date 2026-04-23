# Books Library Frontend

A modern, responsive web application for browsing and managing a digital book library. Built with Next.js 15, TypeScript, and Bootstrap, this application provides an intuitive interface for discovering books from the Gutenberg Project API and managing personal collections.

## Features

- **Book Discovery**: Browse and search books from the Gutenberg Project API
- **Infinite Scroll**: Seamless pagination with intersection observer for smooth browsing
- **Book Selection**: Select and save books to your personal library
- **Search Functionality**: Real-time search with debounced API calls
- **Responsive Design**: Mobile-first design using Bootstrap 5 and custom SCSS
- **State Management**: Efficient state management with Zustand
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Bootstrap 5 + SCSS modules
- **State Management**: Zustand
- **HTTP Client**: Fetch API
- **API Integration**: Gutenberg Project API + Local database API

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd books-library-front-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

### Environment Configuration

The application requires environment variables for API endpoints. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://gutendex.com
NEXT_PUBLIC_API_LOCAL_DB_URL=http://localhost:8000/api
```

## Available Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Components

### Books Service Hook (`useBooksService`)
Custom hook that encapsulates all book-related operations:
- Loading and pagination logic
- Search functionality with debouncing
- CRUD operations for saved books
- Request cancellation and error handling

### State Management (`booksStore`)
Zustand store managing:
- Current book list and pagination
- Saved books collection
- Draft selections
- Loading and error states

### API Layer
Type-safe API client with:
- Book fetching from Gutenberg API
- Local database operations
- Bulk operations for efficiency
- Proper error handling

## Browser Support

This application supports all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License.
