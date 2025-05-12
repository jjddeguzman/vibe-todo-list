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
  @Output() onCheckTodoEvent: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteTodoEvent: EventEmitter<any> = new EventEmitter();
  isChecked: boolean = false;

  onCheckTodo(todo: ITodo): void {
    const checkbox = document.getElementById('myCheckbox') as HTMLInputElement;
    const checkBoxChecked = checkbox.checked;
    this.onCheckTodoEvent.emit({ ...todo, isCompleted: checkBoxChecked });
  }

  onDeleteTodo(id: number | string): void {
    this.onDeleteTodoEvent.emit(id);
  }
}
