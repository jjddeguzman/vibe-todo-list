# GitHub Copilot Instructions - Angular

## Core Rules

### 📁 Project Structure

- Features: `src/app/modules/<feature>/`
- Each feature: `components/`, `services/`, `models/`, `pages/`, `store/`
- Shared utils: `src/app/modules/shared/utils/`

#### Folder Structure Example

```
src/app/modules/
├── todo/                          # Feature module
│   ├── components/                # Reusable components
│   │   ├── todo-header/
│   │   ├── todo-input/
│   │   ├── todo-item/
│   │   └── todo-footer/
│   ├── pages/                     # Page-level components (routes)
│   │   └── todo-list/
│   ├── models/                    # Interfaces & types
│   │   └── todo.model.ts
│   ├── services/                  # Business logic
│   │   └── todo.service.ts
│   ├── store/                     # NgRx state management
│   │   ├── todo.actions.ts
│   │   ├── todo.reducer.ts
│   │   ├── todo.effects.ts
│   │   ├── todo.selector.ts
│   │   └── todo.sandbox.ts
│   └── todo.component.ts          # Feature root component
├── shared/                        # Shared across features
│   └── utils/
│       ├── CommonUtil.ts
│       ├── FormControlUtil.ts
│       └── FormGroupUtil.ts
```

### 📝 File Naming

- Components: `component-name.component.ts|html|scss|spec.ts`
- Services: `service-name.service.ts`
- Models: `model-name.model.ts`
- Store: `feature.actions.ts`, `feature.reducer.ts`, `feature.effects.ts`, `feature.sandbox.ts`, `feature.selector.ts`

### 🏷️ Interface & Model Naming

- **Interfaces**: Prefix with `I` (e.g., `ITodo`, `IUser`, `ITodoState`)
- **Classes**: Use PascalCase (e.g., `TodoService`, `UserComponent`)
- **Enums**: Use PascalCase (e.g., `TodoStatus`, `UserRole`)
- **Functions & Variables**: Use camelCase (e.g., `getTodos()`, `handleClick()`, `todoList`, `isLoading`)
- **Meaningful Names**: Use descriptive, self-explanatory names so the purpose is clear without needing comments (e.g., `calculateTotalPrice()` instead of `calc()`, `isUserLoggedIn` instead of `status`)

### ⚙️ Component Rules (MUST)

- ✅ `ChangeDetectionStrategy.OnPush`
- ✅ `OnDestroy` with unsubscribe
- ✅ `@Input()` and `@Output()` typed
- ✅ Async pipe for observables
- ✅ No `any` types

### 🔧 Service Rules

- Handle business logic only
- Return Observables (not Subjects)
- Inject via constructor

### 🅰️ Angular 17 Standards (NOTE)

- Follow [Angular 17 documentation](https://angular.io/docs)
- Do NOT use Signals - stick with traditional RxJS observables and reactive patterns
- Use Angular 17 best practices for performance and type safety
- Avoid introducing modern/experimental features unless explicitly approved

### 🏪 State Management (NgRx)

- **Actions**: Events that describe what happened (e.g., `GET_TODOS`, `addTodoSuccess`, `deleteTodoFailure`)
  - Pattern: `ActionName`, `ActionNameSuccess`, `ActionNameFailure`
  - Can carry data via `props<{ todo: ITodo }>()`
- **Reducers**: Functions that handle actions and update state
  - Takes current state + action, returns new state (immutable)
  - Use `createReducer()` and `on()` to handle each action
  - Manage data (e.g., todos array) and flags (e.g., loading, error)
- **Selectors**: Functions that extract specific parts of state
  - Pattern: `selectTodoState` gets the whole feature, `selectTodos` gets just the todos array
  - Use `createFeatureSelector()` then `createSelector()` for derived data
  - Components subscribe to selectors via sandbox, not directly to store
- **Effects**: Handle side effects (API calls, async operations)
  - Listen for actions with `ofType()`, make API calls, dispatch success/failure actions
  - Use `switchMap()` for replacing previous requests, `mergeMap()` for parallel requests
  - Example: `GET_TODOS` → API call → `GET_TODOS_Success` or `GET_TODOS_Failure`
- **Sandbox**: Mediator service between components and store
  - Holds observables created from selectors (e.g., `todos$ = store.select(selectTodos)`)
  - Exposes methods that dispatch actions (e.g., `getTodos()` dispatches `GET_TODOS`)
  - Components call sandbox methods and subscribe to sandbox observables, never call `store.dispatch()` directly

### 📦 Imports (In Order)

1. Angular imports
2. Third-party (NgRx, etc.)
3. Local models
4. Local services

### 📝 Commit Message Format

- **FEAT**: New components, features, or additions (e.g., `FEAT: add todo-status-badge component`)
- **CHORE**: Updates, refactoring, dependencies (e.g., `CHORE: update rxjs to latest version`)
- **FIX**: Bug fixes (e.g., `FIX: resolve todo deletion issue`)

---

## When Creating Something, Apply This Checklist

- [ ] Proper folder structure
- [ ] TypeScript strict typing
- [ ] OnPush change detection
- [ ] OnDestroy + unsubscribe
- [ ] JSDoc for public methods
- [ ] Proper imports organization
- [ ] No `any` types
