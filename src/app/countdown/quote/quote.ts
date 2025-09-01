import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteApi } from './quote-api';


@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.html',
  styleUrl: './quote.scss'
})
export class Quote {
  quote: string = '';
  error: string | null = null;

  constructor(private quoteService: QuoteApi) {}

  ngOnInit() {
    this.loadQuote();
  }

  private loadQuote() {
    this.quoteService.getRandomQuote().subscribe({
      next: (data) => {
        this.quote = data.quote;
      },
      error: (err) => console.error('API error:', err)
    });
  }
}
