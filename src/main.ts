import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Amplify } from 'aws-amplify';

import outputs from './amplify_outputs.json'; // TEST EN AMBIENTE LOCAL

// Amplify.configure(outputs)

// bootstrapApplication(App, appConfig)
//   .catch(err => console.error(err)

//   // .catch(err => console.error(err));

async function start() {
  // Cargar el config desde la raíz del sitio
  const res = await fetch('/amplify_outputs.json', { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`No se pudo cargar amplify_outputs.json: ${res.status}`);
  }
  const outputs = await res.json();
  Amplify.configure(outputs);

  // Una vez configurado Amplify, arrancamos Angular
  await bootstrapApplication(App, appConfig);
}

start().catch(err => {
  console.error('Error al iniciar la app:', err)});
  // Opcional: renderizar un fallback o mensaje en el DOM
