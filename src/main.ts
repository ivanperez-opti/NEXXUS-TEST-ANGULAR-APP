import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// bootstrapApplication(App,{
//   providers: [provideCharts(withDefaultRegisterables())],
// }, appConfig)
//   .catch((err) => console.error(err));
bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));