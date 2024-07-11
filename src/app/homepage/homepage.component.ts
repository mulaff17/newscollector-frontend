import { Component, OnInit } from '@angular/core';
import { RssItemsService } from '../rss-items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  rssItems: any[] = [];
  errorMessage!: string;

  constructor(private rssItemsService: RssItemsService) { }

  ngOnInit() {
    this.rssItemsService.getRssItems().subscribe({
      next: (rssItems) => {
        this.rssItems = rssItems;
        console.log('RSS Items loaded:', this.rssItems);  // Debugging-Statement
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Error loading RSS items:', error);  // Debugging-Statement
      },
    });
  }
}
