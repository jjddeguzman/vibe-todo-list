import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoModule } from './modules/todo/todo.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskflow';
}
