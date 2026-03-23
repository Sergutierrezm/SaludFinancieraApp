import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { FinanzasService } from '../../services/finanzas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // --- CONTROL DE FECHA ---
  mesSeleccionado = signal(new Date().getMonth() + 1);
  anioSeleccionado = signal(new Date().getFullYear());

  meses = [
    { id: 1, nombre: 'Enero' }, { id: 2, nombre: 'Febrero' }, { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' }, { id: 5, nombre: 'Mayo' }, { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' }, { id: 8, nombre: 'Agosto' }, { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' }, { id: 11, nombre: 'Noviembre' }, { id: 12, nombre: 'Diciembre' }
  ];
  anios = [2024, 2025, 2026];

  // --- DATOS DEL SERVIDOR ---
  totalIngresos = signal(0);
  totalGastosFijos = signal(0);
  totalGastosVar = signal(0);
  
  listaIngresos = signal<any[]>([]);
  listaGastosDetallados = signal<any[]>([]);

  // --- CÁLCULOS AUTOMÁTICOS (SIGNALS COMPUTED) ---
  
  nombreMesActual = computed(() => {
    const mesId = Number(this.mesSeleccionado());
    return this.meses[mesId - 1]?.nombre || 'Mes desconocido';
  });

  saldoNeto = computed(() => 
    this.totalIngresos() - (this.totalGastosFijos() + this.totalGastosVar())
  );

  porcentajeAhorro = computed(() => {
    if (this.totalIngresos() <= 0) return 0;
    const ahorro = this.saldoNeto();
    return ahorro > 0 ? Math.round((ahorro / this.totalIngresos()) * 100) : 0;
  });

  constructor(
    private finanzasService: FinanzasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const anio = this.anioSeleccionado();
    const mes = this.mesSeleccionado();

    forkJoin({
      ingresos: this.finanzasService.getIngresos(anio, mes),
      fijos: this.finanzasService.getGastosFijos(anio, mes),
      variables: this.finanzasService.getGastos(anio, mes)
    }).subscribe({
      next: (res) => {
        this.listaIngresos.set(res.ingresos);
        
        const fijosMapeados = res.fijos.map((g: any) => ({ ...g, tipo: 'Fijo' }));
        const varMapeados = res.variables.map((v: any) => ({ ...v, tipo: 'Variable' }));
        this.listaGastosDetallados.set([...fijosMapeados, ...varMapeados]);

        this.totalIngresos.set(res.ingresos.reduce((acc: number, i: any) => acc + i.cantidad, 0));
        this.totalGastosFijos.set(res.fijos.reduce((acc: number, g: any) => acc + g.cantidad, 0));
        this.totalGastosVar.set(res.variables.reduce((acc: number, v: any) => acc + v.cantidad, 0));
      },
      error: (err) => console.error('Error cargando dashboard:', err)
    });
  }

  // NAVEGACIÓN
  irAGastos() { this.router.navigate(['/gastos']); }
  irAIngresos() { this.router.navigate(['/ingresos']); }
  irAFijos() { this.router.navigate(['/gastos-fijos']); }
  onFechaChange() { this.cargarDatos(); }
}