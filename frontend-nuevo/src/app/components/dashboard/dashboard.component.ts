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
  totalIngresos = signal(0);
  totalGastosFijos = signal(0);
  totalGastosVar = signal(0);
  
  listaIngresos = signal<any[]>([]);
  listaGastosDetallados = signal<any[]>([]);
  
  today = new Date();

  saldoNeto = computed(() => 
    this.totalIngresos() - (this.totalGastosFijos() + this.totalGastosVar())
  );

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    forkJoin({
      ingresos: this.finanzasService.getIngresos(),
      fijos: this.finanzasService.getGastosFijos(),
      variables: this.finanzasService.getGastos()
    }).subscribe({
      next: (res) => {
        this.listaIngresos.set(res.ingresos);

        // Unimos ambos tipos de gastos asignándoles su etiqueta
        const fijosMapeados = res.fijos.map(g => ({ ...g, tipo: 'Fijo' }));
        const varMapeados = res.variables.map(v => ({ ...v, tipo: 'Variable' }));
        
        this.listaGastosDetallados.set([...fijosMapeados, ...varMapeados]);

        // Cálculo de totales
        this.totalIngresos.set(res.ingresos.reduce((acc, i) => acc + i.cantidad, 0));
        this.totalGastosFijos.set(res.fijos.reduce((acc, g) => acc + g.cantidad, 0));
        this.totalGastosVar.set(res.variables.reduce((acc, v) => acc + v.cantidad, 0));
      },
      error: (err) => console.error('Error cargando datos:', err)
    });
  }

  formatFecha(fecha: any): string {
    if (!fecha || !Array.isArray(fecha)) return '---';
    const [year, month, day] = fecha;
    return `${day < 10 ? '0'+day : day}/${month < 10 ? '0'+month : month}/${year}`;
  }
}