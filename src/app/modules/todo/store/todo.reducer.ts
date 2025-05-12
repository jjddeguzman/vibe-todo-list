import { Action, createReducer, on } from '@ngrx/store';
import * as TODO_ACTIONS from './todo.actions';
import { ITodo, ITodoState } from '../models/todo.model';

export const initialState: ITodoState = {
  todos: [],
  loading: false,
  error: null,
};

const _todoReducer = createReducer(
  initialState,
  // * This is where you call the function
  on(TODO_ACTIONS.GET_TODOS, (state) => getTodosReducer(state)),
  on(TODO_ACTIONS.GET_TODOS_Success, (state, { todos }) =>
    getTodosSuccessReducer(state, todos)
  ),
  on(TODO_ACTIONS.GET_TODOS_Failure, (state, { error }) =>
    getTodosFailureReducer(state, error)
  ),
  // on(TODO_ACTIONS.addTodo, (state, { todo }) => addTodoReducer(state, todo)),
  on(TODO_ACTIONS.addTodoSuccess, (state, { todo }) =>
    addTodoSuccessReducer(state, todo)
  ),
  on(TODO_ACTIONS.deleteTodoSuccess, (state, { id }) =>
    deleteTodoSuccessReducer(state, id)
  ),
  on(TODO_ACTIONS.deleteAllTodosSuccess, (state) =>
    deleteAllTodoSuccessReducer(state)
  )
);

/*
  This part is for setting the logic and getting all the todos from network
  You should always add a success / fail for API Calls
*/
function getTodosReducer(state: ITodoState): ITodoState {
  return { ...state, loading: true };
}

function getTodosSuccessReducer(state: ITodoState, todos: ITodo[]): ITodoState {
  return { ...state, todos, loading: false, error: null };
}

function getTodosFailureReducer(state: ITodoState, error: any): ITodoState {
  return { ...state, loading: false, error };
}

/* This part is for post request to api */
function addTodoSuccessReducer(state: ITodoState, newTodo: ITodo): ITodoState {
  return {
    ...state,
    todos: [...state.todos, newTodo],
  };
}

function deleteAllTodoSuccessReducer(state: ITodoState): ITodoState {
  return {
    ...state,
    todos: [],
  };
}

// function addTodoReducer(state: ITodoState, newTodo: ITodo): ITodoState {
//   return { ...state, todos: [...state.todos, newTodo] };
// }

/* This part is for delete request to api */

function deleteTodoSuccessReducer(state: ITodoState, id: any) {
  return {
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  };
}

/* This part is being called in the app module */
export function todoReducer(state: ITodoState | undefined, action: Action) {
  return _todoReducer(state, action);
}
