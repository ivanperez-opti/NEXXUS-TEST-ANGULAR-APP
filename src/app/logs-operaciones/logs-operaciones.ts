import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLog, LogService } from '../services/log.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logs-operaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs-operaciones.html',
  styleUrl: './logs-operaciones.css',
})
export class LogsOperacionesComponent implements OnInit {

logs$!: Observable<AppLog[]>;

constructor(private logService: LogService) {}

  ngOnInit() {
    this.logs$ = this.logService.getLogs();
  }

  clearLogs() {
    this.logService.clear();
  }
}
