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

@Component({
  selector: 'app-fraud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './fraud.component.html',
  providers: [DatePipe, provideNativeDateAdapter()],
  styleUrl: './fraud.component.css'
})
export class FraudComponent {
  rssItems: (RssData & { newsSiteName?: string })[] = [];
  filterForm!: FormGroup;
  errorMessage!: string;
  formattedDateFrom!: string;
  formattedDateTo!: string;
  readonly dateFrom = new FormControl(new Date());
  readonly dateTo = new FormControl(new Date());
  previousValue: number[] = [];
  readonly formfraudSites: NewsSite[] = [
    { id: 1, name:"Select All"},
    { id: 10, name:"Cybercrime Police"},
    { id: 11, name:"Watchlist Internet"},
    { id: 12, name:"Card Security"},
  ];

  selectedFraudSites = new FormControl<number[]>([]);

  constructor(private rssItemsService: RssItemsService, private formBuilder: FormBuilder, private datePipe: DatePipe){


  }

  
  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      dateFrom: new Date(),
      dateTo: new Date(),
      selectedFraudSites: [[]]
    });
    

  }

  submit() {
    const fraudSites: number[] = this.selectedFraudSites.value || [];

    this.formattedDateFrom = this.datePipe.transform(this.dateFrom.value, 'yyyy-MM-dd') || '';
    this.formattedDateTo = this.datePipe.transform(this.dateTo.value, 'yyyy-MM-dd') || '';
    this.rssItemsService.getFraudRssItemsDate(this.formattedDateFrom, this.formattedDateTo, fraudSites).subscribe({
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
      const allSiteIds = this.formfraudSites.map(site => site.id);
      this.selectedFraudSites.setValue(allSiteIds, { emitEvent: false });
      
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
