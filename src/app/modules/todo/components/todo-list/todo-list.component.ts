import { Component } from '@angular/core';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';
import { TodoInputComponent } from '../todo-input/todo-input.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFooterComponent } from '../todo-footer/todo-footer.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoHeaderComponent, TodoInputComponent, TodoItemComponent, TodoFooterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
