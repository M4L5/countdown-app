import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteApi } from './quote-api';
import { Spinner } from '../../reusables/spinner/spinner';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, Spinner],
  templateUrl: './quote.html',
  styleUrl: './quote.scss'
})
export class Quote {
  quote: string = '';
  error: string | null = null;
  loading = false;

  constructor(private quoteService: QuoteApi) {}

  ngOnInit() {
    this.loadQuote();
  }

  private loadQuote() {
    this.loading = true;
    this.quoteService.getRandomQuote().subscribe({
      next: (data) => {
        this.quote = data.quote;
        this.loading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.error = 'Failed to load quote';
        this.loading = false;
      }
    });
  }
}
