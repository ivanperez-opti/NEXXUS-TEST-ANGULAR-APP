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

 onCreate(callback: (sale: Schema['Sales']['type']) => void) {
    return this.client.models.Sales.onCreate().subscribe({
      next: (result) => callback(result),
      error: (err) => console.error("Error onCreate:", err)
    });
  }

  onUpdate(callback: (sale: Schema['Sales']['type']) => void) {
    return this.client.models.Sales.onUpdate().subscribe({
      next: (result) => callback(result),
      error: (err) => console.error("Error onUpdate:", err)
    });
  }

  onDelete(callback: (sale: Schema['Sales']['type']) => void) {
    return this.client.models.Sales.onDelete().subscribe({
      next: (result) => callback(result),
      error: (err) => console.error("Error onDelete:", err)
    });
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
