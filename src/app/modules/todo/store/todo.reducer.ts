import { Action, createReducer, on } from '@ngrx/store';
import * as TODO_ACTIONS from './todo.actions';
import { ITodo, ITodoState } from '../models/todo.model';

export const initialState: ITodoState = {
  todos: [] as ITodo[],
  loading: false,
  error: null as any,
};

const _todoReducer = createReducer(
  initialState,

  // * Get Todos
  on(TODO_ACTIONS.GET_TODOS, (state) => ({
    ...state,
    loading: true,
  })),

  on(TODO_ACTIONS.GET_TODOS_Success, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    error: null,
  })),

  on(TODO_ACTIONS.GET_TODOS_Failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // * Add Todo
  // Note: If you have an addTodo action (without 'Success'), you'd handle it here
  // on(TODO_ACTIONS.addTodo, (state, { todo }) => ({
  //   ...state,
  //   // Potentially add a 'saving' flag or similar
  // })),
  on(TODO_ACTIONS.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(TODO_ACTIONS.addTodoFailure, (state, { error }) => ({
    ...state,
    error: error, // Assuming you have an addTodoFailure action now
  })),

  // * Delete Todo
  on(TODO_ACTIONS.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  on(TODO_ACTIONS.deleteTodoFailure, (state, { error }) => ({
    ...state,
    error: error, // Assuming you have a deleteTodoFailure action now
  })),

  // * Delete All Todos
  on(TODO_ACTIONS.deleteAllTodosSuccess, (state) => ({
    ...state,
    todos: [],
  })),
  on(TODO_ACTIONS.deleteAllTodosFailure, (state, { error }) => ({
    ...state,
    error: error, // Assuming you have a deleteAllTodosFailure action now
  })),
);

// This part is being called in the app module
export function todoReducer(state: ITodoState | undefined, action: Action) {
  return _todoReducer(state, action);
}
