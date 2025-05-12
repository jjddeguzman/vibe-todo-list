import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TodoFooterComponent } from '../../components/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from '../../components/todo-header/todo-header.component';
import { TodoInputComponent } from '../../components/todo-input/todo-input.component';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoHeaderComponent,
    TodoInputComponent,
    TodoItemComponent,
    TodoFooterComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  inputForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      whatNeedsToBeDone: [null, Validators.required],
    });
  }

  get whatNeedsToBeDone(): AbstractControl {
    return this.inputForm?.get('whatNeedsToBeDone');
  }

  onAddClick(): void {
    if (this.inputForm.valid) {
      console.log(this.whatNeedsToBeDone.value);
      this.inputForm.reset();
    } else {
      alert('Add a todo');
    }
  }
}
