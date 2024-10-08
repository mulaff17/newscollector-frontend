import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RssData } from './rss-data';

@Injectable({
  providedIn: 'root'
})
export class RssItemsService {

  private apiUrl = 'https://api.cybernews-collector.ch';

  constructor(private http: HttpClient) { }
  getRssItemsDate(dateFrom: string, dateTo: string, newsSites: number[]): Observable<RssData[]> {
    const newsSitesString = newsSites.join(','); // Convert the array to a comma-separated string
    const params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo)
      .set('newsSites', newsSitesString); // Set the string as the value
      
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-items/filter`, { params });
  }

  getFraudRssItemsDate(dateFrom: string, dateTo: string, newsSites: number[]): Observable<RssData[]> {
    const newsSitesString = newsSites.join(','); // Convert the array to a comma-separated string
    const params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo)
      .set('newsSites', newsSitesString); // Set the string as the value
      
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-items/filter-fraud`, { params });
  }
  
  
  

  getCurrentRssItems(): Observable<RssData[]> {
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-items-current`);
  }

  getFraudRssItems(): Observable<RssData[]> {
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-fraud`);
  }

  getImageUrl(id: number): string {
    return `${this.apiUrl}/api/image/${id}`;
  }

  getNewsSiteName(id: number): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(`${this.apiUrl}/api/newssite/${id}`);
  }
}
