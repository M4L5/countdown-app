import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-info',
  imports: [FormsModule],
  templateUrl: './date-info.html',
  styleUrl: './date-info.scss',
  standalone: true,
})
export class DateInfo {
  @Input() title = '';
  @Output() titleChange = new EventEmitter<string>();

  @Input() date = '';
  @Output() dateChange = new EventEmitter<string>();
}
