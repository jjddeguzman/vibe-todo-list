// todo.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from '../models/todo.model';

export const selectTodoState = createFeatureSelector<ITodoState>('todo');

export const selectTodos = createSelector(
  selectTodoState,
  (state: ITodoState) => state.todos
);
