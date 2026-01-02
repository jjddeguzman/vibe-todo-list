// todo.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl: string = 'http://localhost:3000/todos';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private isMock: boolean = false;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    if (this.isMock) {
      return of([
        { id: 1, title: 'Learn Angular', description: '', isCompleted: false },
        {
          id: 2,
          title: 'Touch some grass',
          description: '',
          isCompleted: true,
        },
        { id: 3, title: 'Go to the gym', description: '', isCompleted: false },
      ]);
    }
    return this.http.get<ITodo[]>(this.baseUrl);
  }

  addTodo(todo: ITodo): Observable<ITodo> {
    const headers = this.headers;
    const url = this.baseUrl;
    return this.http.post<ITodo>(url, todo, { headers });
  }

  deleteTodo(id: number): Observable<ITodo> {
    const url = `${this.baseUrl}/${id}`;
    const headers = this.headers;
    return this.http.delete<ITodo>(url, { headers });
  }

  deleteAllTodos(): Observable<void> {
    const url = '/api/data/todos';
    return this.http.delete<void>(url);
  }
}
