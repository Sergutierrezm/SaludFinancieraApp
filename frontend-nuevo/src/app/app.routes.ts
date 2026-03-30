import { Routes } from '@angular/router';
import { GastosComponent } from './components/gastos/gastos.component';
import { GastosFijosComponent } from './components/gastos-fijos/gastos-fijos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { Login } from './components/login/login';
// 1. IMPORTANTE: Importa el componente (asegúrate de que la ruta al archivo es correcta)
import { AnalisisComponent } from './components/analisis/analisis'; 

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gastos', component: GastosComponent },
  { path: 'gastos-fijos', component: GastosFijosComponent },
  { path: 'ingresos', component: IngresosComponent },
  
  // 2. Nueva ruta para el análisis (fíjate en la coma al final de la línea anterior)
  { path: 'analisis', component: AnalisisComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];