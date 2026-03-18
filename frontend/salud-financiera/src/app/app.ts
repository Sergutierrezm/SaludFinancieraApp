import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GastosComponent } from './components/gastos/gastos.component';
import { GastosFijosComponent } from './components/gastos-fijos/gastos-fijos.component';

// src/app/app.ts
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [BrowserModule, FormsModule, RouterModule],
})
export class App {
  title = 'Salud Financiera';
}