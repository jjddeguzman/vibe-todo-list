import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.scss'
})
export class TodoHeaderComponent {
@Input() headerTitle: string = '';
}
