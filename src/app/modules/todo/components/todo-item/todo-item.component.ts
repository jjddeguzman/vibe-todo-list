import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todoLists: ITodo[];
  @Output() onCheckTodoEvent: EventEmitter<ITodo> = new EventEmitter();
  @Output() onDeleteTodoEvent: EventEmitter<any> = new EventEmitter();

  onCheckTodo(todo: ITodo): void {
    this.onCheckTodoEvent.emit(todo);
  }

  onDeleteTodo(id: number | string): void {
    this.onDeleteTodoEvent.emit(id);
  }
}
