import { Subject, takeUntil } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoFooterComponent } from '../../components/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from '../../components/todo-header/todo-header.component';
import { TodoInputComponent } from '../../components/todo-input/todo-input.component';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { ITodo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoSandbox } from '../../store/todo.sandbox';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoHeaderComponent,
    TodoInputComponent,
    TodoItemComponent,
    TodoFooterComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit, OnDestroy {
  inputForm: FormGroup;
  todoLists: ITodo[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private todoSanbox: TodoSandbox,
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.getTodoLists();
    this.initializeFormAndStoreSubscriptions();
  }
  initializeFormAndStoreSubscriptions() {
    this.todoSanbox.todos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((todos: ITodo[]) => {
        this.todoLists = todos;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get whatNeedsToBeDone(): AbstractControl {
    return this.inputForm?.get('whatNeedsToBeDone');
  }

  initializeForms(): void {
    this.inputForm = this.formBuilder.group({
      whatNeedsToBeDone: [null, Validators.required],
    });
  }

  getTodoLists(): void {
    this.todoSanbox.loadTodos();
  }

  onAddClick(): void {
    if (this.inputForm.valid) {
      const newTodo: ITodo = {
        id: crypto.randomUUID(),
        title: this.whatNeedsToBeDone.value,
        description: '',
        isCompleted: false,
      };
      this.todoSanbox.addTodo(newTodo);
      this.inputForm.reset();
    } else {
      alert('Add a todo');
    }
  }

  onCheckTodo(todo: ITodo): void {
    console.log(todo, 'checked');
    // TODO create sandbox for updating the todo item
  }

  onDeleteTodo(id: number | string): void {
    // console.log(id, 'deleted');
    // this.todoLists = this.todoLists.filter((todo) => todo.id !== id);
    // TODO create sandbox for deleting the todo item
    this.todoSanbox.deleteTodo(id);
  }
}
