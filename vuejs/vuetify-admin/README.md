# Vuetify Admin

Modern Admin Dashboard Template built with Nuxt 4, Vuetify 3, and BunJS.

## Tech Stack

- **Nuxt 4.2.2** - Vue.js Framework
- **Vuetify 3.11.5** - Material Design UI
- **BunJS** - JavaScript Runtime
- **Pinia** - State Management
- **TypeScript** - Type Safety

## Getting Started

### Prerequisites

- [BunJS](https://bun.sh/) installed

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

### Build

```bash
# Build for production
bun run build

# Preview production build
bun .output/server/index.mjs
```

## Project Structure

```
vuetify-admin/
├── app/                    # Main application directory
│   ├── assets/             # Styles and assets
│   ├── components/         # Vue components
│   ├── layouts/            # Page layouts
│   ├── pages/              # File-based routing
│   ├── plugins/            # Nuxt plugins
│   ├── stores/             # Pinia stores
│   └── utils/              # Utility functions
├── server/                 # Server-side code
│   ├── api/                # API routes
│   └── utils/              # Server utilities
├── shared/                 # Shared between app and server
│   ├── types/              # TypeScript types
│   └── utils/              # Shared utilities
└── public/                 # Static files
```

## Features

- 🎨 **Material Design** with Vuetify 3
- 🌙 **Dark/Light Theme** toggle
- 📱 **Responsive** design
- 🔐 **Authentication** pages (Login, Register, Forgot Password)
- 📊 **Dashboard** with stats widgets
- 👥 **CRUD** sample (Users)
- ⚡ **BunJS** runtime for performance

## License

MIT
