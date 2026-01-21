import { Injectable } from '@angular/core';
import { LogData } from './log-data';

export type LogLevel = 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';

export interface AppLog {
  timestamp: Date;
  level: LogLevel;
  message: string;
  source?: string;
}

@Injectable({ providedIn: 'root' })
export class LogService {

  constructor(private logData: LogData) {}

  log(message: string, level: LogLevel = 'INFO', source?: string) {
    const log: AppLog = {
      timestamp: new Date(),
      level,
      message,
      source,
    };

    this.logData.saveLog(log).subscribe({
      error: (err: unknown) =>
        console.error('Error guardando log', err),
    });
  }

  getLogs() {
    return this.logData.getLogs();
  }
}
