import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanzasService } from '../../services/finanzas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Signals para almacenar los totales
  totalIngresos = signal(0);
  totalGastosFijos = signal(0);
  totalGastosVar = signal(0);

  // Signal computada: Se actualiza sola cuando cambian los anteriores
  saldoNeto = computed(() => 
    this.totalIngresos() - (this.totalGastosFijos() + this.totalGastosVar())
  );

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit() {
    // Lanzamos las 3 peticiones a la vez
    forkJoin({
      ingresos: this.finanzasService.getIngresos(),
      fijos: this.finanzasService.getGastosFijos(),
      variables: this.finanzasService.getGastos()
    }).subscribe({
      next: (res) => {
        // Sumamos las cantidades de cada array
        this.totalIngresos.set(res.ingresos.reduce((acc, i) => acc + i.cantidad, 0));
        this.totalGastosFijos.set(res.fijos.reduce((acc, g) => acc + g.cantidad, 0));
        this.totalGastosVar.set(res.variables.reduce((acc, v) => acc + v.cantidad, 0));
      },
      error: (err) => console.error('Error cargando el Dashboard:', err)
    });
  }
}