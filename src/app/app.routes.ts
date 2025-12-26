import { Routes } from '@angular/router';
import { ChartComponent } from './chart-component/chart-component';
import { LogsOperacionesComponent } from './logs-operaciones/logs-operaciones';
import { VentasFormulario } from './ventas-formulario/ventas-formulario';

export const routes: Routes = [  
    { path: '', redirectTo: 'chart', pathMatch: 'full' },
    { path: 'chart', component: ChartComponent },
    { path: 'logs', component: LogsOperacionesComponent },
    { path: 'sales', component: VentasFormulario }
];

