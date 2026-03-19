import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. IMPORTA LOS COMPONENTES AQUÍ:
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GastosFijosComponent } from './components/gastos-fijos/gastos-fijos.component';
import { GastosComponent } from './components/gastos/gastos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // 2. AÑÁDELOS A LA LISTA DE IMPORTS:
    DashboardComponent,
    GastosFijosComponent,
    GastosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'salud-financiera';
}