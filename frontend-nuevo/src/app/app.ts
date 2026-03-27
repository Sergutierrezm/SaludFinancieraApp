import { Component, signal, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar'; 
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('frontend-nuevo');
  // Usamos un signal para controlar si se ve el navbar
  showNavbar = signal(false);

  constructor(private router: Router) {
    // Escuchamos los cambios de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      // Si NO es login y NO es la raíz vacía, mostramos navbar
      this.showNavbar.set(url !== '/login' && url !== '/');
    });
  }
}
