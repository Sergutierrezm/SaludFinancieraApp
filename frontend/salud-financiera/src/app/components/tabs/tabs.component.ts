import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { Dashboard } from '../dashboard/dashboard';
import { Ingresos } from '../ingresos/ingresos';
import { GastosComponent } from '../gastos/gastos';
import { GastosFijos } from '../gastos-fijos/gastos-fijos';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    Dashboard,
    Ingresos,
    GastosComponent,
    GastosFijos
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

  tabs: { title: string; month: number; year: number }[] = [
    { title: 'Marzo 2026', month: 3, year: 2026 },
    { title: 'Febrero 2026', month: 2, year: 2026 }
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
      year: newYear
    });
  }

  getMonthName(month: number) {
    return [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ][month - 1];
  }
}