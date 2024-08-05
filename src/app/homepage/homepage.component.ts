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

  rssItems: (RssData & { newsSiteName?: string })[] = [];
  rssFraudItems: (RssData & { newsSiteName?: string })[] = [];
  errorMessage!: string;

  constructor(private rssItemsService: RssItemsService) { }

  ngOnInit() {
    this.rssItemsService.getRssItems().subscribe({
      next: (rssItems: RssData[]) => {
        this.rssItems = rssItems.sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());
        this.loadNewsSiteNames(); 
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Error loading RSS items:', error);
      },
    });

    this.rssItemsService.getFraudRssItems().subscribe({
      next: (rssFraudItems: RssData[]) => {
        this.rssFraudItems = rssFraudItems.sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());
        this.loadNewsSiteNames(); 
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Error loading RSS items:', error);
      },
    });

  }

  getImageUrl(id: number): string {
    return this.rssItemsService.getImageUrl(id);
  }

  loadNewsSiteNames() {
    this.rssItems.forEach((item, index) => {
      this.rssItemsService.getNewsSiteName(item.news_site_id).subscribe({
        next: (response) => {
          this.rssItems[index].newsSiteName = response.length > 0 ? response[0].name : 'Unknown';
        },
        error: (error) => {
          console.error('Error loading news site name:', error);
        },
      });
    });
  }
}
