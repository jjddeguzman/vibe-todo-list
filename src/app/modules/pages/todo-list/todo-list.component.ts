import { Component } from '@angular/core';
import { TodoFooterComponent } from '../../todo/components/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from '../../todo/components/todo-header/todo-header.component';
import { TodoInputComponent } from '../../todo/components/todo-input/todo-input.component';
import { TodoItemComponent } from '../../todo/components/todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoHeaderComponent, TodoInputComponent, TodoItemComponent, TodoFooterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
