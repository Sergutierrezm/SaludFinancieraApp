import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Cambiamos esto
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor'; // Asegúrate de que la ruta sea correcta

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Aquí "enchufamos" el interceptor para que todas las llamadas lo usen
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};