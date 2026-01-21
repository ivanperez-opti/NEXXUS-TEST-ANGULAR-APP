import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLog, LogService } from '../services/log.service';

@Component({
  selector: 'app-logs-operaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs-operaciones.html',
  styleUrl: './logs-operaciones.css',
})
export class LogsOperacionesComponent implements OnInit {

  logs: AppLog[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }
}
