import { Injectable } from '@angular/core';
import { ChartService } from './chart-service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
   constructor(
    private chartService: ChartService,
    private logService: LogService
  ) {
    this.init();
  }

  private init() {
    this.chartService.onCreate(sale => {
      this.logService.log(
        `Venta creada: ${sale.month} ${sale.year} - $${sale.total}`,
        'SUCCESS',
        'Sales/Create'
      );
    });

    this.chartService.onUpdate(sale => {
      this.logService.log(
        `Venta actualizada: ${sale.month} ${sale.year} → $${sale.total}`,
        'INFO',
        'Sales/Update'
      );
    });

    this.chartService.onDelete(sale => {
      this.logService.log(
        `Venta eliminada: ${sale.month} ${sale.year}`,
        'WARN',
        'Sales/Delete'
      );
    });
  }
}
