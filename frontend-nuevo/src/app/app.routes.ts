import { Routes } from '@angular/router';
import { GastosComponent } from './components/gastos/gastos.component';
import { GastosFijosComponent } from './components/gastos-fijos/gastos-fijos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { Login } from './components/login/login'; // <--- Importamos el Login

export const routes: Routes = [
  { path: 'login', component: Login }, // Nueva ruta para el login
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gastos', component: GastosComponent },
  { path: 'gastos-fijos', component: GastosFijosComponent },
  { path: 'ingresos', component: IngresosComponent },
  
  // Cambiamos el redireccionamiento para que la App empiece en el Login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Opcional: Si escriben cualquier cosa mal en la URL, que vuelvan al Login
  { path: '**', redirectTo: '/login' }
];