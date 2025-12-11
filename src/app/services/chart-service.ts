import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private client = generateClient<Schema>(); 

  async getSalesForChart() {
    const result = await this.client.models.Sales.list();
    const sales = result.data ?? [];

    // Ordenar por año/mes (opcional)
    const ordered = sales.sort((a, b) =>
      a.year === b.year
        ? a.month.localeCompare(b.month)
        : a.year - b.year
    );

    return {
      labels: ordered.map(s => `${s.month} ${s.year}`),
      datasets: [
        {
          data: ordered.map(s => s.total),
          label: 'Ventas (Total $)'
        }
      ]
    };
  }

  async createSale(month: string, year: number, total: number, items: number) {
    const result = await this.client.models.Sales.create({
      month, 
      year, 
      total,
      items,
    });
    return result.data;
  }
}
