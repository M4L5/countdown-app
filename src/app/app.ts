import { Component, signal } from '@angular/core';
import { Countdown } from './countdown/countdown';

@Component({
  selector: 'app-root',
  imports: [Countdown],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('countdown-app');
}
