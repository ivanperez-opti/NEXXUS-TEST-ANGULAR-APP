import { Component, ViewChild } from '@angular/core';
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

   @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Datos del ejemplo
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  private subCreate: any;
  private subUpdate: any;
  private subDelete: any;

  constructor(private chartService: ChartService) {}

  async ngOnInit() {
    const chartData = await this.chartService.getSalesForChart();

    this.barChartData.labels = chartData.labels;
    this.barChartData.datasets = chartData.datasets;
    console.log("DE aqui se carga la info")
    
    setTimeout(() => this.chart?.update());
    // 2. Suscripción en tiempo real
    this.subCreate = this.chartService.onCreate((sale) => this.handleCreate(sale));
    this.subUpdate = this.chartService.onUpdate((sale) => this.handleUpdate(sale));
    this.subDelete = this.chartService.onDelete((sale) => this.handleDelete(sale));
  }

  private handleCreate(sale: any) {
    const label = `${sale.month} ${sale.year}`;

    this.barChartData.labels?.push(label);
    (this.barChartData.datasets[0].data as number[]).push(sale.total);

    this.chart?.update();
  }

  private handleUpdate(sale: any) {
    const label = `${sale.month} ${sale.year}`;
    const index = this.barChartData.labels?.indexOf(label);

    // Si existe → actualizarlo
    if (index !== undefined && index >= 0) {
      (this.barChartData.datasets[0].data as number[])[index] = sale.total;
    }

    this.chart?.update();
  }

  private handleDelete(sale: any) {
    const label = `${sale.month} ${sale.year}`;
    const index = this.barChartData.labels?.indexOf(label);

    if (index !== undefined && index >= 0) {
      this.barChartData.labels?.splice(index, 1);
      (this.barChartData.datasets[0].data as number[]).splice(index, 1);
    }

    this.chart?.update();
  }

  ngOnDestroy() {
    this.subCreate?.unsubscribe?.();
    this.subUpdate?.unsubscribe?.();
    this.subDelete?.unsubscribe?.();
  }

}

// mutation CreateSale {
//   createSales(input: {
//     month: "November",
//     year: 2025,
//     total: 635.23,
//     items: 230
//   }) {
//     id
//     month
//     year
//     total
//     items
//     createdAt
//     updatedAt
//   }
// }