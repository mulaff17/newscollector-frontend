import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RssItemsService } from '../rss-items.service';
import { RssData } from '../rss-data';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {  
  filterForm!: FormGroup;
  rssItems: (RssData & { newsSiteName?: string })[] = [];

  errorMessage!: string;


  constructor(private formBuilder: FormBuilder, private rssItemsService: RssItemsService){
    this.filterForm = this.formBuilder.group({
      dateFrom: [''],
      dateTo: ['']
    })
  }

  submitForm() {
    console.log(this.filterForm.value)

    this.rssItemsService.getRssItemsDate(this.filterForm.value.dateFrom, this.filterForm.value.dateTo).subscribe({
      next: (rssItems: RssData[]) => {
        this.rssItems = rssItems.sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());
        this.loadNewsSiteNames(); 
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Error loading RSS items:', error);
      },
    });

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