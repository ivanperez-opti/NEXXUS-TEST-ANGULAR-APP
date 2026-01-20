import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { AppLog } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class LogData {
  private client = generateClient<Schema>();
  private sessionId = crypto.randomUUID();

  async saveLog(log: AppLog) {
    try {
      await this.client.models.Logs.create({
        level: log.level,
        message: log.message,
        source: log.source,
        timestamp: log.timestamp.toISOString(),
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
      });
    } catch (err) {
      console.error('Error saving log to Dynamo:', err);
    }
  }
}
