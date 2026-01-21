import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Amplify } from 'aws-amplify';

async function start() {
  const res = await fetch('/amplify_outputs.json', { cache: 'no-cache' });

  if (!res.ok) {
    throw new Error(`No se pudo cargar amplify_outputs.json: ${res.status}`);
  }

  const outputs = await res.json();

  Amplify.configure(outputs);

  await bootstrapApplication(App, appConfig);
}

start().catch(err => {
  console.error('Error al iniciar la app:', err);
});
