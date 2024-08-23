import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RssData } from './rss-data';

@Injectable({
  providedIn: 'root'
})
export class RssItemsService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  getRssItemsDate(dateFrom: string, dateTo: string, newsSites: number[]): Observable<RssData[]> {
    const newsSitesString = newsSites.join(','); // Convert the array to a comma-separated string
    const params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo)
      .set('newsSites', newsSitesString); // Set the string as the value
      
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-items/filter`, { params });
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
