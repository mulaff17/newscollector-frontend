import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewsComponent } from './news/news.component';
import { FraudComponent } from './fraud/fraud.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'news',
        component: NewsComponent
    },
    {
        path: 'fraud',
        component: FraudComponent
    }
];
