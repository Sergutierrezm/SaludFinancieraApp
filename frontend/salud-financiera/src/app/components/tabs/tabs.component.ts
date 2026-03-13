import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { Dashboard } from '../dashboard/dashboard';
import { Ingresos } from '../ingresos/ingresos';
import { Gastos } from '../gastos/gastos';
import { GastosFijos } from '../gastos-fijos/gastos-fijos';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    Dashboard,
    Ingresos,
    Gastos,
    GastosFijos
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

  tabs = [
    { title: 'Marzo 2026', month: 3, year: 2026, component: 'dashboard' },
    { title: 'Febrero 2026', month: 2, year: 2026, component: 'dashboard' }
  ];

  addMonthTab() {
    const lastTab = this.tabs[this.tabs.length - 1];
    let newMonth = lastTab.month + 1;
    let newYear = lastTab.year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    this.tabs.push({
      title: `${this.getMonthName(newMonth)} ${newYear}`,
      month: newMonth,
      year: newYear,
      component: 'dashboard'
    });
  }

  getMonthName(month: number) {
    return [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ][month - 1];
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  clearTabs() {
    this.tabs = [];
  }
}