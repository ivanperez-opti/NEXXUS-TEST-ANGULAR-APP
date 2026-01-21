import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { from, map, Observable } from 'rxjs';
import { AppLog } from './log.service';
import { Amplify } from 'aws-amplify';


Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://7udods6ojbdjznexn2fcdf6rwi.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-3iisacj5dzgkxb7fyucbpn3xhq',
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

  saveLog(log: AppLog) {
    return from(
      client.graphql({
        query: CREATE_LOG,
        authMode: 'apiKey',
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
      client.graphql({
        query: LIST_LOGS,
        authMode: 'apiKey',
      }) as Promise<any>
    ).pipe(
      map(res => {
        if (res.errors) {
          console.error('GraphQL errors:', res.errors);
          throw res.errors;
        }

        return (res.data?.listLogs?.items ?? []).map(
          (l: any): AppLog => ({
            level: l.level,
            message: l.message,
            source: l.source ?? undefined,
            timestamp: new Date(l.timestamp),
          })
        );
      })
    );
  }
}
