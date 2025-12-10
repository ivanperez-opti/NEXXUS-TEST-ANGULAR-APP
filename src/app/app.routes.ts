import { Routes } from '@angular/router';
import { ChartComponent } from './chart-component/chart-component';

export const routes: Routes = [  
    { path: '', redirectTo: 'chart', pathMatch: 'full' },
    { path: 'chart', component: ChartComponent }
];
