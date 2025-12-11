import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Amplify } from 'aws-amplify';

import outputs from './amplify_outputs.json'; // TEST EN AMBIENTE LOCAL

async function start() {
  Amplify.configure(outputs); // TEST EN AMBIENTE LOCAL
}

await bootstrapApplication(App, appConfig);
start().catch(err => console.error(err));
  // .catch(err => console.error(err));