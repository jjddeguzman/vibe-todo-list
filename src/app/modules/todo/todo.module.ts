import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
// import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoEffects } from './store/todo.effects';
import { todoReducer } from './store/todo.reducer';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoListComponent,
    // StoreModule.forRoot({ todo: todoReducer }),
    // EffectsModule.forRoot([TodoEffects]),
  ],
  exports: [TodoComponent],
})
export class TodoModule {}
