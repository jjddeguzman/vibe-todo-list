import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.scss',
})
export class TodoInputComponent {
  @Input() inputForm: FormGroup;
  @Output() onAddClickEvent: EventEmitter<any> = new EventEmitter();

  get whatNeedsToBeDone(): any {
    return this.inputForm.get('whatNeedsToBeDone');
  }

  onAdd(): void {
    this.onAddClickEvent.emit();
  }
}
