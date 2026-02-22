# NgRx Store Boilerplate Template

Complete boilerplate for creating new store features in this project. Use this as a template and replace `Feature` with your actual feature name (e.g., `User`, `Product`, `Settings`).

---

## File Structure

```
src/app/modules/<feature>/store/
├── <feature>.actions.ts
├── <feature>.reducer.ts
├── <feature>.effects.ts
├── <feature>.selector.ts
└── <feature>.sandbox.ts
```

---

## 1. Actions (`feature.actions.ts`)

Define all actions that can happen in your feature. Use the pattern: `ACTION`, `ACTIONSuccess`, `ACTIONFailure`.

```typescript
import { createAction, props } from '@ngrx/store';
import { IFeatureModel } from '../models/feature.model';

// GET_ITEMS
export const GET_ITEMS = createAction('[Feature] Get Items');
export const GET_ITEMS_Success = createAction(
  '[Feature] Get Items Success',
  props<{ items: IFeatureModel[] }>()
);
export const GET_ITEMS_Failure = createAction(
  '[Feature] Get Items Failure',
  props<{ error: string | null }>()
);

// ADD_ITEM
export const addItem = createAction(
  '[Feature] Add Item',
  props<{ item: IFeatureModel }>()
);
export const addItemSuccess = createAction(
  '[Feature] Add Item Success',
  props<{ item: IFeatureModel }>()
);
export const addItemFailure = createAction(
  '[Feature] Add Item Failure',
  props<{ error: string | null }>()
);

// DELETE_ITEM
export const deleteItem = createAction(
  '[Feature] Delete Item',
  props<{ id: number | string }>()
);
export const deleteItemSuccess = createAction(
  '[Feature] Delete Item Success',
  props<{ id: number | string }>()
);
export const deleteItemFailure = createAction(
  '[Feature] Delete Item Failure',
  props<{ error: string | null }>()
);
```

---

## 2. Reducer (`feature.reducer.ts`)

Handle state updates based on actions. Always use immutable patterns (spread operators).

```typescript
import { Action, createReducer, on } from '@ngrx/store';
import * as FEATURE_ACTIONS from './feature.actions';
import { IFeatureModel, IFeatureState } from '../models/feature.model';

export const initialState: IFeatureState = {
  items: [] as IFeatureModel[],
  loading: false,
  error: null,
};

const _featureReducer = createReducer(
  initialState,
  
  on(FEATURE_ACTIONS.GET_ITEMS, (state) => ({
    ...state,
    loading: true,
  })),
  
  on(FEATURE_ACTIONS.GET_ITEMS_Success, (state, { items }) => ({
    ...state,
    items: items as IFeatureModel[],
    loading: false,
    error: null as string | null,
  })),
  
  on(FEATURE_ACTIONS.GET_ITEMS_Failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  on(FEATURE_ACTIONS.addItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  
  on(FEATURE_ACTIONS.addItemFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  
  on(FEATURE_ACTIONS.deleteItemSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== id),
  })),
  
  on(FEATURE_ACTIONS.deleteItemFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function featureReducer(state: IFeatureState | undefined, action: Action) {
  return _featureReducer(state, action);
}
```

---

## 3. Selectors (`feature.selector.ts`)

Extract specific parts of state. Selectors are the only way components access state.

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFeatureState } from '../models/feature.model';

export const selectFeatureState = createFeatureSelector<IFeatureState>('feature');

export const selectItems = createSelector(
  selectFeatureState,
  (state: IFeatureState) => state.items
);

export const selectLoading = createSelector(
  selectFeatureState,
  (state: IFeatureState) => state.loading
);

export const selectError = createSelector(
  selectFeatureState,
  (state: IFeatureState) => state.error
);
```

---

## 4. Effects (`feature.effects.ts`)

Handle all side effects: API calls, async operations, etc. Use `switchMap()` for single requests, `mergeMap()` for parallel requests.

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as FeatureActions from './feature.actions';
import { FeatureService } from '../services/feature.service';

@Injectable()
export class FeatureEffects {
  constructor(private actions$: Actions, private featureService: FeatureService) {}

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureActions.GET_ITEMS),
      switchMap(() =>
        this.featureService.getItems().pipe(
          map((items) => FeatureActions.GET_ITEMS_Success({ items })),
          catchError((error) => of(FeatureActions.GET_ITEMS_Failure({ error: error.message })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureActions.addItem),
      switchMap((action) =>
        this.featureService.addItem(action.item).pipe(
          map((item) => FeatureActions.addItemSuccess({ item })),
          catchError((error) => of(FeatureActions.addItemFailure({ error: error.message })))
        )
      )
    )
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureActions.deleteItem),
      switchMap((action) =>
        this.featureService.deleteItem(action.id).pipe(
          map(() => FeatureActions.deleteItemSuccess({ id: action.id })),
          catchError((error) => of(FeatureActions.deleteItemFailure({ error: error.message })))
        )
      )
    )
  );
}
```

---

## 5. Sandbox (`feature.sandbox.ts`)

Mediator service between components and store. Components ONLY interact with the sandbox, never directly with the store.

```typescript
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FeatureActions from './feature.actions';
import { IFeatureModel, IFeatureState } from '../models/feature.model';
import { selectItems, selectLoading, selectError } from './feature.selector';

@Injectable()
export class FeatureSandbox {
  items$: Observable<IFeatureModel[]> = this.store.select(selectItems);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  constructor(private store: Store<IFeatureState>) {}

  loadItems(): void {
    this.store.dispatch(FeatureActions.GET_ITEMS());
  }

  addItem(item: IFeatureModel): void {
    this.store.dispatch(FeatureActions.addItem({ item }));
  }

  deleteItem(id: number | string): void {
    this.store.dispatch(FeatureActions.deleteItem({ id }));
  }
}
```

---

## 6. Component Usage Example

```typescript
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FeatureSandbox } from '../../store/feature.sandbox';
import { IFeatureModel } from '../../models/feature.model';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="loading$ | async" class="loading">Loading...</div>
    <div *ngIf="error$ | async as error" class="error">{{ error }}</div>
    <div *ngFor="let item of items$ | async" class="item">
      {{ item.name }}
    </div>
  `,
})
export class FeatureComponent implements OnInit, OnDestroy {
  items$ = this.sandbox.items$;
  loading$ = this.sandbox.loading$;
  error$ = this.sandbox.error$;
  
  private destroy$ = new Subject<void>();

  constructor(private sandbox: FeatureSandbox) {}

  ngOnInit(): void {
    this.sandbox.loadItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## Integration Steps

1. **Create Model** - Define `IFeatureModel` and `IFeatureState` in `models/feature.model.ts`
2. **Create Service** - Define `FeatureService` in `services/feature.service.ts` with API methods
3. **Generate Files** - Generate all 5 store files using the templates above
4. **Register Reducer** - Add reducer to your app configuration
5. **Provide Effects** - Add effects provider to your app configuration
6. **Inject Sandbox** - Inject sandbox into components instead of store

---

## Quick Reference

| File | Purpose | Key Points |
|------|---------|-----------|
| **Actions** | Define what can happen | Use `ACTION`, `ACTIONSuccess`, `ACTIONFailure` pattern |
| **Reducer** | Update state immutably | Use spread operators, never mutate directly |
| **Selectors** | Extract state data | Use `createFeatureSelector()` + `createSelector()` |
| **Effects** | Handle side effects | Use `switchMap()` for serial, `mergeMap()` for parallel |
| **Sandbox** | Component mediator | Exposes observables and dispatch methods |

---

## Best Practices

✅ **DO:**
- Keep state as flat as possible
- Use immutable updates with spread operators
- Always have Success/Failure variants for async actions
- Subscribe to observables in templates with `async` pipe
- Use `takeUntil()` for cleanup when needed
- Use `ChangeDetectionStrategy.OnPush` on components

❌ **DON'T:**
- Mutate state directly
- Subscribe to store directly in components (use sandbox)
- Use `any` types in state
- Forget to unsubscribe from observables
- Mix component logic with state management
- Create circular dependencies between selectors
