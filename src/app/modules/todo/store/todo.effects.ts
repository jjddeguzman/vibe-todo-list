// todo.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          // If there is list of todos return the todos
          map((todos) => TodoActions.getTodosSuccess({ todos })),
          // else catch error return error
          catchError((error) => of(TodoActions.getTodosFailure({ error })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      switchMap((action) =>
        this.todoService.addTodo(action.todo).pipe(
          map((todo) => TodoActions.addTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.addTodoFailure({ error })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      switchMap((action) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
          catchError((error) => of(TodoActions.deleteTodoFailure({ error })))
        )
      )
    )
  );

  deleteAllTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteAllTodos),
      switchMap(() =>
        this.todoService.deleteAllTodos().pipe(
          map(() => TodoActions.deleteAllTodosSuccess()),
          catchError((error) =>
            of(TodoActions.deleteAllTodosFailure({ error }))
          )
        )
      )
    )
  );
}
