import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterType } from '../../types/filter.types';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss',
})
export class TodoFooterComponent {
  @Input() itemCount: number;
  @Input() activeFilter: FilterType = 'all';
  @Output() onFilterChangeEvent: EventEmitter<FilterType> = new EventEmitter();
  @Output() onClearCompletedEvent: EventEmitter<void> = new EventEmitter();

  onFilterClick(filter: FilterType): void {
    this.onFilterChangeEvent.emit(filter);
  }

  onClearCompleted(): void {
    this.onClearCompletedEvent.emit();
  }
}
