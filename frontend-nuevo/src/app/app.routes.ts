import { Routes } from '@angular/router';
import { GastosComponent } from './components/gastos/gastos.component';
import { GastosFijosComponent } from './components/gastos-fijos/gastos-fijos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';

export const routes: Routes = [
  { path: 'gastos', component: GastosComponent },
  { path: 'gastos-fijos', component: GastosFijosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'ingresos', component: IngresosComponent }
];