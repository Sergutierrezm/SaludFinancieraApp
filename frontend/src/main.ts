import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // <--- Cambiado de 'App' a 'AppComponent' y de './app/app' a './app/app.component'

bootstrapApplication(AppComponent, appConfig) // <--- Cambiado de 'App' a 'AppComponent'
  .catch((err) => console.error(err));