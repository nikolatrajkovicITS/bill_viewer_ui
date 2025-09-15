# Bill Viewer - Irish Legislation Explorer

A React application for viewing Irish legislation bills from the Oireachtas API with filtering, favorites, and bilingual support.

## Features

- **Bill Table**: Paginated table with bill number, type, status, and sponsor
- **Filtering**: Filter bills by status (Current, Withdrawn, Enacted, etc.)
  > I went with a Status filter (instead of Type) based on my understanding of the requirement. Status seemed more suitable for common searches, and Type had fewer options.
- **Bill Details**: Click any row to view modal with English/Irish titles
- **Favorites**: Heart icon to favorite/unfavorite bills (persists in state)
- **Favorites Tab**: Separate view for favorited bills
- **Responsive**: Mobile-first design with Material-UI

## Tech Stack

- **React 19** + **TypeScript** + **Material-UI**
- **Vite** (build tool) + **Zustand** (state) + **TanStack Query** (API)
- **MSW** (Mock Service Worker) for favorites API
- **Vitest** + **React Testing Library** for testing
- **ESLint** + **Prettier** + **Husky** for code quality and formatting

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## Available Scripts

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Build for production     |
| `npm run test`          | Run tests                |
| `npm run test:coverage` | Run tests with coverage  |
| `npm run lint`          | Run ESLint               |
| `npm run format`        | Format code              |

## API Integration

**Oireachtas API**: Real Irish legislation data via proxy (`/api/oireachtas/v1/legislation`)

**Mock API (MSW)**: Simulates favorites endpoints:

- `POST /api/favourites` - Add favorite
- `DELETE /api/favourites/:id` - Remove favorite
- `GET /api/favourites` - Get favorites

## Project Structure

```
src/
├── components/    # UI components (bills, modals, ui)
├── hooks/         # Custom hooks (API calls)
├── mocks/         # MSW handlers
├── store/         # Zustand stores
├── types/         # TypeScript types
└── utils/         # Helper functions
```

## Testing

```bash
npm test              # Run tests
npm run test:ui       # Run with UI
npm run test:coverage # With coverage
```

## Requirements Met

✅ Paginated bill table with required columns  
✅ Filter by bill type/status  
✅ Modal with English/Gaeilge tabs  
✅ Favorites system with console logging  
✅ Favorites tab view  
✅ React + Material-UI + TypeScript  
✅ Unit tests and code quality tools

---
