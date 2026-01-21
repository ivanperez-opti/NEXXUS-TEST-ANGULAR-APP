import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { AppLog } from './log.service';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';


Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://7udodsjznexn2fcdf6rwi.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'TU_API_KEY',
    },
  },
});

const client = generateClient();

const CREATE_LOG = `
  mutation CreateLogs($input: CreateLogsInput!) {
    createLogs(input: $input) {
      id
    }
  }
`;

const LIST_LOGS = `
  query ListLogs {
    listLogs {
      items {
        id
        level
        message
        source
        timestamp
      }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class LogData {
 saveLog(log: AppLog): Observable<any> {
    return from(
      client.graphql({
        query: CREATE_LOG,
        variables: {
          input: {
            level: log.level ?? 'INFO',
            message: log.message ?? '',
            source: log.source ?? 'APP',
            timestamp: log.timestamp.toISOString(),
          },
        },
      })
    );
  }

  getLogs(): Observable<AppLog[]> {
    return from(
      client.graphql({ query: LIST_LOGS }) as Promise<any>
    ).pipe(
      map(res =>
        res.data.listLogs.items.map((l: any) => ({
          level: l.level,
          message: l.message,
          source: l.source,
          timestamp: new Date(l.timestamp),
        }))
      )
    );
  }
}
