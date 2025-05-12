import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss',
})
export class TodoFooterComponent {
  @Input() itemCount: number;
}
