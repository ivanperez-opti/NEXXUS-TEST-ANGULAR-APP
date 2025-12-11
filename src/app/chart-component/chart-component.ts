import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartService } from '../services/chart-service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart-component',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})

export class ChartComponent {
  // Datos del ejemplo
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private chartService: ChartService) {}

  async ngOnInit() {
    const chartData = await this.chartService.getSalesForChart();

    this.barChartData.labels = chartData.labels;
    this.barChartData.datasets = chartData.datasets;
  }

}
