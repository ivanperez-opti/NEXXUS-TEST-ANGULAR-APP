import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';
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

  @ViewChild('barChart', { read: BaseChartDirective }) barChart?: BaseChartDirective;
  @ViewChild('pieChart', { read: BaseChartDirective }) pieChart?: BaseChartDirective;
  @ViewChild('polarChart', { read: BaseChartDirective }) polarChart?: BaseChartDirective;

  // Datos del ejemplo
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
        legend: {
          labels: {
            color: '#ffffff'
          }
        },
        tooltip: {
          titleColor: '#ffffff',
          bodyColor: '#ffffff'
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        y: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      }
  };
  
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };
  
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        titleColor: '#ffffff',
        bodyColor: '#ffffff'
      }
    }
  };

  public polarChartData: ChartConfiguration<'polarArea'>['data'] = {
    labels: [],
    datasets: []
  };
  
  public polarChartOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: true,    
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        titleColor: '#ffffff',
        bodyColor: '#ffffff'
      }
    }
  };  

  private subCreate: any;
  private subUpdate: any;
  private subDelete: any;

  constructor(private chartService: ChartService) {}

  async ngOnInit() {
    const chartData = await this.chartService.getSalesForChart();

    const labels = [...chartData.labels];
    const data = [...chartData.datasets[0].data];

    this.barChartData.labels = [...labels];
    this.barChartData.datasets = [{
      label: 'Ventas (Total $)',
      data: [...data],
      backgroundColor: data.map((_, i) => this.colors[i % this.colors.length])
    }];

    this.pieChartData.labels = [...labels];
    this.pieChartData.datasets = [{
      data: [...data],
      backgroundColor: data.map((_, i) => this.colors[i % this.colors.length])
    }];

    this.polarChartData.labels = [...labels];
    this.polarChartData.datasets = [{
      data: [...data],
      backgroundColor: data.map((_, i) => this.colors[i % this.colors.length])
    }];
    
    setTimeout(() => {
      this.barChart?.update();
      this.pieChart?.update();
      this.polarChart?.update();
    });
    // 2. Suscripción en tiempo real
    this.subCreate = this.chartService.onCreate((sale) => this.handleCreate(sale));
    this.subUpdate = this.chartService.onUpdate((sale) => this.handleUpdate(sale));
    this.subDelete = this.chartService.onDelete((sale) => this.handleDelete(sale));
  }

  private handleCreate(sale: any) {
    const label = `${sale.month} ${sale.year}`;

    this.barChartData.labels?.push(label);
    (this.barChartData.datasets[0].data as number[]).push(sale.total);
    
    this.pieChartData.labels?.push(label);
    (this.pieChartData.datasets[0].data as number[]).push(sale.total);
    
    this.polarChartData.labels?.push(label);
    (this.polarChartData.datasets[0].data as number[]).push(sale.total);
    

    this.barChart?.update();
    this.pieChart?.update();
    this.polarChart?.update();

    // console.log('ANTES DE LOG SERVICE', this.logService);
    console.count('CREATE EVENT');
    console.log(sale);
  }

  private handleUpdate(sale: any) {
    const label = `${sale.month} ${sale.year}`;
    const index = this.barChartData.labels?.indexOf(label);
    const index_pie = this.pieChartData.labels?.indexOf(label);
    const index_polar = this.polarChartData.labels?.indexOf(label);

    if (index !== undefined && index >= 0) {
      (this.barChartData.datasets[0].data as number[])[index] = sale.total;
    }
    if (index_pie !== undefined && index_pie >= 0) {
      (this.pieChartData.datasets[0].data as number[])[index_pie] = sale.total;
    }
    if (index_polar !== undefined && index_polar >= 0) {
      (this.polarChartData.datasets[0].data as number[])[index_polar] = sale.total;
    }

    this.barChart?.update();
    this.pieChart?.update();
    this.polarChart?.update();
  }

  private handleDelete(sale: any) {
    const label = `${sale.month} ${sale.year}`;
    const index = this.barChartData.labels?.indexOf(label);
    const index_pie = this.pieChartData.labels?.indexOf(label);
    const index_polar = this.polarChartData.labels?.indexOf(label);

    if (index !== undefined && index >= 0) {
      this.barChartData.labels?.splice(index, 1);
      (this.barChartData.datasets[0].data as number[]).splice(index, 1);
    }
    if (index_pie !== undefined && index_pie >= 0) {
      this.pieChartData.labels?.splice(index_pie, 1);
      (this.pieChartData.datasets[0].data as number[]).splice(index_pie, 1);
    }
    if (index_polar !== undefined && index_polar >= 0) {
      this.polarChartData.labels?.splice(index_polar, 1);
      (this.polarChartData.datasets[0].data as number[]).splice(index_polar, 1);
    }

    this.barChart?.update();
    this.pieChart?.update();
    this.polarChart?.update();
  }

  ngOnDestroy() {
    this.subCreate?.unsubscribe?.();
    this.subUpdate?.unsubscribe?.();
    this.subDelete?.unsubscribe?.();
  }

  public colors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40'
  ];

}