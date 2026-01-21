import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { SalesService } from './services/sales-service';
import { LogService } from './services/log.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  // protected readonly title = signal('AngularChartApp');
  protected readonly title = signal('AngularChartApp');
  constructor(private salesService: SalesService, private logService: LogService, private router: Router,) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.logService.log(
          `Cambio de pestaña a ${event.urlAfterRedirects}`,
          'INFO',
          'ROUTER'
        );
      });
  }
}

