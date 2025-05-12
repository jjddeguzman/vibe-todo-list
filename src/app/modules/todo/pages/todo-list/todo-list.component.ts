import { Observable, of, Subject, takeUntil } from 'rxjs';
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
    private todoSanbox: TodoSandbox
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.getTodoLists();
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
    const mockData = [
      {
        id: 0,
        title: 'Learn Angular',
        description: '',
        isCompleted: false,
      },
      {
        id: 1,
        title: 'Do the dishes',
        description: '',
        isCompleted: false,
      },
      {
        id: 2,
        title: 'Go to the gym',
        description: '',
        isCompleted: false,
      },
    ];
    let mockTodoList: Observable<ITodo[]> = of(mockData);
    mockTodoList.pipe(takeUntil(this.destroy$)).subscribe((todoLists) => {
      this.todoLists = todoLists;
    });
    this.todoSanbox.loadTodos();
    this.todoSanbox.todos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((todos: ITodo[]) => {
        console.log(todos, 'todos');
      });
  }

  onAddClick(): void {
    if (this.inputForm.valid) {
      const newTodo: ITodo = {
        id: this.todoLists.length,
        title: this.whatNeedsToBeDone.value,
        description: '',
        isCompleted: false,
      };
      this.todoLists.push(newTodo);
      console.log(this.whatNeedsToBeDone.value);
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
    console.log(id, 'deleted');
    this.todoLists = this.todoLists.filter((todo) => todo.id !== id);
    // TODO create sandbox for deleting the todo item
  }
}
