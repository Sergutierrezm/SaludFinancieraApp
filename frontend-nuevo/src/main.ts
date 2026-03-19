import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // 👈 Esto ahora es correcto porque tu archivo es app.ts

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));