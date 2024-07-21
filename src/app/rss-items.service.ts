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

  getRssItems(): Observable<RssData[]> {
    return this.http.get<RssData[]>(`${this.apiUrl}/api/rss-items`);
  }
}
