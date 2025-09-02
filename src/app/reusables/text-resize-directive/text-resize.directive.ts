import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[resizeText]',
  standalone: true
})
export class ResizeTextDirective implements AfterViewInit, OnDestroy {
  private ro?: ResizeObserver;        // watch container only
  private mo?: MutationObserver;      // watch text changes
  private rafId?: number;             // debounce per frame

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const el = this.el.nativeElement;
    el.style.whiteSpace = 'nowrap';
    el.style.overflow = 'hidden';

    // Observe parent size (enough for rotations/resizes/layout changes)
    const container = el.parentElement ?? el;
    this.ro = new ResizeObserver(() => this.queueFit());
    this.ro.observe(container);

    // Refit when the text updates (e.g. countdown ticks)
    this.mo = new MutationObserver(() => this.queueFit());
    this.mo.observe(el, { childList: true, characterData: true, subtree: true });

    this.queueFit();
  }

  ngOnDestroy() {
    this.ro?.disconnect();
    this.mo?.disconnect();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  // raf debounce: coalesce multiple observer callbacks into one layout pass
  private queueFit() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.fit());
  }

  // Find the largest font-size that fits width and (approx) height
  private fit() {
    const el = this.el.nativeElement;
    const txt = (el.textContent || '').trim();
    if (!txt) { el.style.fontSize = ''; return; }

    const container = el.parentElement ?? el;
    const cw = container.clientWidth;
    const ch = container.clientHeight || 1;

    // Height cap: keep one line within container height (~1.15 line-height)
    const maxByHeight = Math.max(8, Math.floor(ch / 1.15));

    // Binary search bounds (px)
    let low = 8;
    let high = Math.min(256, maxByHeight);
    let best = low;

    while (low <= high) {
      const mid = (low + high) >> 1;
      el.style.fontSize = `${mid}px`;

      // Width fits if no horizontal overflow
      const fitsW = el.scrollWidth <= cw;
      // Height fits if chosen px is within our precomputed cap (no expensive DOM read)
      const fitsH = mid <= maxByHeight;

      if (fitsW && fitsH) { best = mid; low = mid + 1; }
      else { high = mid - 1; }
    }

    el.style.fontSize = `${best}px`;
  }
}