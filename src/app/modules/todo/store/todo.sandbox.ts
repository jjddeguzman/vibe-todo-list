// This file is for calling in the component logic
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as TodoActions from './todo.actions';
import { ITodo, ITodoState } from '../models/todo.model';
import { selectTodos } from './todo.selector';

@Injectable()
export class TodoSandbox {
  todos$: Observable<ITodo[]> = this.store.select(selectTodos);

  constructor(private store: Store<ITodoState>) {}

  loadTodos(): void {
    const getTodos = TodoActions.GET_TODOS();
    this.store.dispatch(getTodos);
  }

  addTodo(todo: ITodo): void {
    const singleTodo = { todo };
    this.store.dispatch(TodoActions.addTodo(singleTodo));
  }

  deleteTodo(id: any) {
    const singleId = { id };
    this.store.dispatch(TodoActions.deleteTodo(singleId));
  }

  deleteAllTodos() {
    this.store.dispatch(TodoActions.deleteAllTodos());
  }
}
