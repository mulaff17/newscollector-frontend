import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RssItemsService } from '../rss-items.service';
import { RssData } from '../rss-data';
import { NewsSite } from '../news-site';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';





@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './news.component.html',
  providers: [DatePipe, provideNativeDateAdapter()],
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {  
  rssItems: (RssData & { newsSiteName?: string })[] = [];
  filterForm!: FormGroup;
  errorMessage!: string;
  formattedDateFrom!: string;
  formattedDateTo!: string;
  readonly dateFrom = new FormControl(new Date());
  readonly dateTo = new FormControl(new Date());
  previousValue: number[] = [];
  readonly formNewsSites: NewsSite[] = [
    { id: 1, name:"Select All"},
    { id: 2, name:"Wired"},
    { id: 3, name:"The Hacker News"},
    { id: 4, name:"BleepingComputer"},
    { id: 5, name:"The Verge"},
    { id: 6, name:"Inside IT"},
    { id: 7, name:"CSO Deutschland"},
    { id: 8, name:"KrebsonSecurity"},
    { id: 9, name:"DARK Reading"}
  ];

  selectedNewsSites = new FormControl<number[]>([]);

  constructor(private rssItemsService: RssItemsService, private formBuilder: FormBuilder, private datePipe: DatePipe){


  }

  
  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      dateFrom: new Date(),
      dateTo: new Date(),
      selectedNewsSites: [[]]
    });
    

  }

  submit() {
    const newsSites: number[] = this.selectedNewsSites.value || [];

    this.formattedDateFrom = this.datePipe.transform(this.dateFrom.value, 'yyyy-MM-dd') || '';
    this.formattedDateTo = this.datePipe.transform(this.dateTo.value, 'yyyy-MM-dd') || '';
    this.rssItemsService.getRssItemsDate(this.formattedDateFrom, this.formattedDateTo, newsSites).subscribe({
      next: (rssItems: RssData[]) => {
        this.rssItems = rssItems.sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());
        this.loadNewsSiteNames(); 
      },
      error: (error:any) => {
        this.errorMessage = error;
        console.error('Error loading RSS items:', error);
      },
    });

  }
  onSelectionChange(event:any){
    if(event.value.includes(1)){
      const allSiteIds = this.formNewsSites.map(site => site.id);
      this.selectedNewsSites.setValue(allSiteIds, { emitEvent: false });
      
     }
    
  }

  getImageUrl(id: number): string {
    return this.rssItemsService.getImageUrl(id);
  }

  loadNewsSiteNames() {
    this.rssItems.forEach((item, index) => {
      this.rssItemsService.getNewsSiteName(item.news_site_id).subscribe({
        next: (response:any) => {
          this.rssItems[index].newsSiteName = response.length > 0 ? response[0].name : 'Unknown';
        },
        error: (error:any) => {
          console.error('Error loading news site name:', error);
        },
      });
    });
  }

  

}