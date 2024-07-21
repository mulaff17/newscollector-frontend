import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RssItemsService } from '../rss-items.service';
import { RssData } from '../rss-data';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  rssItems: RssData[] = [];
  errorMessage!: string;

  constructor(private rssItemsService: RssItemsService) { }

  ngOnInit() {
    this.rssItemsService.getRssItems().subscribe({
      next: (rssItems: RssData[]) => {
        this.rssItems = rssItems;
      },
      error: (error) => {
        this.errorMessage = 'Error loading RSS items';
        console.error('Error loading RSS items:', error);
      },
    });
  }

  getImageUrl(guid: string): string {
    return `http://localhost:3000/api/image/${guid}`;
  }
}
