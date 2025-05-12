import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from "./components/todo-list/todo-list.component";

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoListComponent
],
  exports: [TodoComponent]
})
export class TodoModule { }
