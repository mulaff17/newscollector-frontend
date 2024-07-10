import { Component, OnInit } from '@angular/core';
import { RssItemsService } from '../rss-items.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {


  rssItems: any[] = [];
  errorMessage!: string;


  constructor(private rssItemsService: RssItemsService) { }

  ngOnInit() {
    this.rssItemsService.getRssItems().subscribe({
      next: (rssItems) => {
        this.rssItems = rssItems;
        console.log(this.rssItems);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

}
