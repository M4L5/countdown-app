import { Component } from '@angular/core';
import { TimerDisplay } from './timer-display/timer-display';
import { DateInfo } from './date-info/date-info';
import { Quote } from './quote/quote';

@Component({
  selector: 'app-countdown',
  imports: [TimerDisplay, Quote, DateInfo],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss'
})
export class Countdown {

}
