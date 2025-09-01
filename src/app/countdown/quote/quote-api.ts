import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuoteResponse {
  quote: string;
}

@Injectable({providedIn: 'root'})

export class QuoteApi {
  private apiUrl = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  getRandomQuote():Observable<QuoteResponse> {
    return this.http.get<QuoteResponse>(this.apiUrl)
  }
}
