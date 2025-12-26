import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesService } from './services/sales-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('AngularChartApp');
  protected readonly title = signal('AngularChartApp');
  constructor(private salesService: SalesService) {}
}
