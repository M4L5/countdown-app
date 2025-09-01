import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-timer-display',
  imports: [],
  templateUrl: './timer-display.html',
  styleUrl: './timer-display.scss'
})
export class TimerDisplay implements OnInit, OnDestroy {
  countdownText = "";
  private timerId: any;

  private target = new Date(2026, 5, 19, 0, 0, 0);

  ngOnInit() {
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  private updateCountdown() {
    let diff = this.target.getTime() - Date.now();
    if (diff < 0) diff = 0; 

    let rest = diff;
    const days = Math.floor(rest / 86_400_000); rest -= days * 86_400_000;
    const hours = Math.floor(rest / 3_600_000); rest -= hours * 3_600_000;
    const minutes = Math.floor(rest / 60_000);   rest -= minutes * 60_000;
    const seconds = Math.floor(rest / 1_000);

    this.countdownText = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
    if (diff === 0) clearInterval(this.timerId);
  }
}
