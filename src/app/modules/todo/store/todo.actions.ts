import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/todo.model';

// * get all todos part
export const getTodos = createAction('[Todo] Get Todos');
export const getTodosSuccess = createAction(
  '[Todo] Get Todos Success',
  props<{ todos: ITodo[] }>()
);
export const getTodosFailure = createAction(
  '[Todo] Get Todos Failure',
  props<{ error: any }>()
);

// * add todo
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: ITodo }>()
);

export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: ITodo }>()
);

export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: any }>()
);

// * delete todo
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: number }>()
);

export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: any }>()
);

// * delete all todo

export const deleteAllTodos = createAction('[Todo] Delete All Todos');
export const deleteAllTodosSuccess = createAction('[Todo] Delete All Todos Success');
export const deleteAllTodosFailure = createAction('[Todo] Delete All Todos Failure', props<{ error: any }>());