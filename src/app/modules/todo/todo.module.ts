import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from '../pages/todo-list/todo-list.component';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoListComponent
],
  exports: [TodoComponent]
})
export class TodoModule { }
