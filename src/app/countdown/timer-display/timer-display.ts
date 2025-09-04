import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ResizeTextDirective } from '../../reusables/text-resize-directive/text-resize.directive';

@Component({
  selector: 'app-timer-display',
  standalone: true,
  templateUrl: './timer-display.html',
  styleUrls: ['./timer-display.scss'],
  imports: [ResizeTextDirective],
})
export class TimerDisplay implements AfterViewInit, OnDestroy, OnChanges {
  @Input() title = '';
  @Input() endDate: Date | null = null;

  countdownText = '';
  private timerId: any;

  @ViewChild(ResizeTextDirective, { static: false }) fitText!: ResizeTextDirective;

  ngAfterViewInit() {
    this.start();
  }
  ngOnChanges() {
    this.start();
  }
  ngOnDestroy() {
    this.stop();
  }

  private start() {
    this.stop();
    if (!this.endDate) {
      this.countdownText = '';
      return;
    }
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
  }

  private stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private updateCountdown() {
    const now = Date.now();
    const end = this.endDate?.getTime?.() ?? now;
    let diff = end - now;

    if (diff <= 0) {
      this.countdownText = '0 days, 0 hours, 0 minutes, 0 seconds';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.countdownText = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
}
