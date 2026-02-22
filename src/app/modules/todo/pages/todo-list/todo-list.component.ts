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
import { FilterType } from '../../types/filter.types';

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
  filteredTodoLists: ITodo[] = [];
  activeFilter: FilterType = 'all';
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
        this.applyFilter(this.activeFilter);
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
    const todoIndex = this.todoLists.findIndex((t) => t.id === todo.id);
    if (todoIndex !== -1) {
      // Create a new array to trigger change detection
      const updatedTodos = [...this.todoLists];
      updatedTodos[todoIndex] = {
        ...updatedTodos[todoIndex],
        isCompleted: !updatedTodos[todoIndex].isCompleted,
      };
      this.todoLists = updatedTodos;
      this.applyFilter(this.activeFilter);
    }
  }

  onDeleteTodo(id: number | string): void {
    this.todoSanbox.deleteTodo(id);
  }

  onFilterChange(filter: FilterType): void {
    this.activeFilter = filter;
    this.applyFilter(filter);
  }

  private applyFilter(filter: FilterType): void {
    switch (filter) {
      case 'active':
        this.filteredTodoLists = this.todoLists.filter(
          (todo) => !todo.isCompleted,
        );
        break;
      case 'completed':
        this.filteredTodoLists = this.todoLists.filter(
          (todo) => todo.isCompleted,
        );
        break;
      case 'all':
      default:
        this.filteredTodoLists = [...this.todoLists];
    }
  }

  onClearCompleted(): void {
    const completedIds = this.todoLists
      .filter((todo) => todo.isCompleted)
      .map((todo) => todo.id);
    completedIds.forEach((id) => this.todoSanbox.deleteTodo(id));
  }
}
