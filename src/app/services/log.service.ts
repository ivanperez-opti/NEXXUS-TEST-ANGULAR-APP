import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LogLevel = 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';

export interface AppLog {
  timestamp: Date;
  level: LogLevel;
  message: string;
  source?: string;
}

@Injectable({ providedIn: 'root' })
export class LogService {

  private readonly STORAGE_KEY = 'APP_LOGS';
  private logs$ = new BehaviorSubject<AppLog[]>(this.loadFromStorage());

  getLogs() {
    return this.logs$.asObservable();
  }

  log(message: string, level: LogLevel = 'INFO', source?: string) {
    const newLog: AppLog = {
      timestamp: new Date(),
      level,
      message,
      source
    };

    const updated = [newLog, ...this.logs$.value];

    this.logs$.next(updated);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  clear() {
    this.logs$.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private loadFromStorage(): AppLog[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];

    try {
      return JSON.parse(raw).map((l: any) => ({
        ...l,
        timestamp: new Date(l.timestamp)
      }));
    } catch {
      return [];
    }
  }
}