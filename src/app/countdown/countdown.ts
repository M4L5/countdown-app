import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimerDisplay } from './timer-display/timer-display';
import { DateInfo } from './date-info/date-info';
import { Quote } from './quote/quote';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule, FormsModule, TimerDisplay, Quote, DateInfo],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
  standalone: true,
})
export class Countdown {
  // default titel och datum
  title = 'Midsummer Eve';
  endDateStr = '2026-06-19';

  get endDate(): Date | null {
    if (!this.endDateStr) return null;
    const [y, m, d] = this.endDateStr.split('-').map(Number);
    return new Date(y, m - 1, d, 0, 0, 0);
  }
}
