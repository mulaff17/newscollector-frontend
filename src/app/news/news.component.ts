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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  






@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, ReactiveFormsModule, CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './news.component.html',
  providers: [
    DatePipe,
    provideNativeDateAdapter()  // Use native JavaScript Date object
  ],
  styleUrls: ['./news.component.css']
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
    { id: 0, name:"Select All"},
    { id: 1, name:"Wired"},
    { id: 2, name:"The Hacker News"},
    { id: 3, name:"BleepingComputer"},
    { id: 4, name:"The Verge"},
    { id: 5, name:"Inside IT"},
    { id: 6, name:"CSO Deutschland"},
    { id: 7, name:"KrebsonSecurity"},
    { id: 8, name:"DARK Reading"}
  ];

  selectedNewsSites = new FormControl<number[]>([]);

  isPageLoaded: boolean = true;  
  isLoading: boolean = false;    

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

    this.isPageLoaded = false;    
    this.isLoading = true;        

    this.formattedDateFrom = this.datePipe.transform(this.dateFrom.value, 'yyyy-MM-dd') || '';
    this.formattedDateTo = this.datePipe.transform(this.dateTo.value, 'yyyy-MM-dd') || '';
    this.rssItemsService.getRssItemsDate(this.formattedDateFrom, this.formattedDateTo, newsSites).subscribe({
      next: (rssItems: RssData[]) => {
        this.rssItems = rssItems.sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());
        this.loadNewsSiteNames(); 
        this.isLoading = false;
      },
      error: (error:any) => {
        this.errorMessage = error;
        console.error('Error loading RSS items:', error);
        this.isLoading = false;
      },
    });

  }
  onSelectionChange(event:any){
    if(event.value.includes(0)){
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