# TaskFlow

A minimal, fast todo list app built with Angular 17 and NgRx.

## Features

- Create, read, update, and delete tasks
- Filter by status: All, Active, Completed
- Clean, minimal UI with Tailwind CSS
- State management with NgRx

## Tech Stack

- **Frontend**: Angular 17 (standalone components)
- **State**: NgRx with Sandbox pattern
- **Styling**: Tailwind CSS
- **API**: json-server (mock)
- **Build**: esbuild

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server + mock API
npm run dev

# Or run separately
npm start          # ng serve
npm run mock:api   # json-server
```

The app will be available at `http://localhost:4200`

## File Structure

```
src/app/
├── modules/todo/
│   ├── components/      (todo-input, todo-item, todo-footer, todo-header)
│   ├── pages/           (todo-list)
│   ├── store/           (NgRx actions, reducer, effects, selectors, sandbox)
│   ├── services/        (todo.service)
│   └── models/          (todo.model)
└── shared/utils/        (common utilities)
```

## Scripts

- `npm start` - Start dev server
- `npm run dev` - Run ng serve + mock API concurrently
- `npm run build` - Build for production
- `npm test` - Run tests

