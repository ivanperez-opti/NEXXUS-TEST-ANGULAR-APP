import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json'; // TEST EN AMBIENTE LOCAL
// import { awsExports } from './aws-exports';
// Amplify.configure(awsExports);

Amplify.configure(outputs); // TEST EN AMBIENTE LOCAL

// bootstrapApplication(App,{
//   providers: [provideCharts(withDefaultRegisterables())],
// }, appConfig)
//   .catch((err) => console.error(err));
bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));