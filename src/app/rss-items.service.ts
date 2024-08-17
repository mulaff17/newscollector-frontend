import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RssData } from './rss-data';

@Injectable({
  providedIn: 'root'
})
export class RssItemsService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRssItemsDate(dateFrom: Date, dateTo: Date): Observable<RssData[]> {
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-items/${dateFrom}-${dateTo}`);
  }

  getCurrentRssItems(): Observable<RssData[]> {
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-items-current`);
  }

  getFraudRssItems(): Observable<RssData[]> {
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-fraud`);
  }

  getImageUrl(id: number): string {
    return `http://localhost:3000/api/image/${id}`;
  }

  getNewsSiteName(id: number): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(`${this.apiUrl}/api/newssite/${id}`);
  }
}
