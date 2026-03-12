import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',  // corregido
  styleUrls: ['./tabs.component.css']    // corregido
})
export class TabsComponent {

  // Lista de pestañas iniciales
  tabs = [
    { title: 'Ingresos', component: 'ingresos' },
    { title: 'Gastos', component: 'gastos' },
    { title: 'Gastos Fijos', component: 'gastos-fijos' },
    { title: 'Balance', component: 'dashboard' }
  ];

  // Añadir nueva pestaña
  addTab(title: string, component: string) {
    this.tabs.push({ title, component });
  }

  // Cerrar pestaña por índice
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  // Limpiar todas las pestañas
  clearTabs() {
    this.tabs = [];
  }
}