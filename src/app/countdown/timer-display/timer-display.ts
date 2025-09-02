import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ResizeTextDirective } from '../../reusables/text-resize-directive/text-resize.directive';

@Component({
  selector: 'app-timer-display',
  standalone: true,
  templateUrl: './timer-display.html',
  styleUrls: ['./timer-display.scss'],
  imports: [ResizeTextDirective]
})
export class TimerDisplay implements AfterViewInit {
  countdownText = '';
  private endDate = new Date('2026-06-19T00:00:00');

  @ViewChild(ResizeTextDirective, { static: false }) fitText!: ResizeTextDirective;

  ngAfterViewInit() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const diff = this.endDate.getTime() - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.countdownText = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
}
