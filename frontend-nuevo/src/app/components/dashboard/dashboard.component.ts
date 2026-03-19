import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 🆕 Importa el Router
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
  // --- SIGNALS DE CONTROL ---
  mesSeleccionado = signal(new Date().getMonth() + 1);
  anioSeleccionado = signal(new Date().getFullYear());

  meses = [
    { id: 1, nombre: 'Enero' }, { id: 2, nombre: 'Febrero' }, { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' }, { id: 5, nombre: 'Mayo' }, { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' }, { id: 8, nombre: 'Agosto' }, { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' }, { id: 11, nombre: 'Noviembre' }, { id: 12, nombre: 'Diciembre' }
  ];
  anios = [2024, 2025, 2026];

  // --- SIGNALS DE DATOS ---
  totalIngresos = signal(0);
  totalGastosFijos = signal(0);
  totalGastosVar = signal(0);
  
  listaIngresos = signal<any[]>([]);
  listaGastosDetallados = signal<any[]>([]);
  
  today = new Date();

  saldoNeto = computed(() => 
    this.totalIngresos() - (this.totalGastosFijos() + this.totalGastosVar())
  );

  // 🆕 Función para que el HTML sepa cuánto sumar en la tarjeta de variables
  totalGastosVariables = computed(() => this.totalGastosVar());

  constructor(
    private finanzasService: FinanzasService,
    private router: Router // 🆕 Inyecta el Router aquí
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

        // Marcamos cada gasto con su tipo para filtrarlos en el HTML
        const fijosMapeados = res.fijos.map((g: any) => ({ ...g, tipo: 'Fijo' }));
        const varMapeados = res.variables.map((v: any) => ({ ...v, tipo: 'Variable' }));
        
        this.listaGastosDetallados.set([...fijosMapeados, ...varMapeados]);

        this.totalIngresos.set(res.ingresos.reduce((acc: number, i: any) => acc + i.cantidad, 0));
        this.totalGastosFijos.set(res.fijos.reduce((acc: number, g: any) => acc + g.cantidad, 0));
        this.totalGastosVar.set(res.variables.reduce((acc: number, v: any) => acc + v.cantidad, 0));
      },
      error: (err) => console.error('Error cargando datos:', err)
    });
  }

  // 🆕 Funciones de navegación para los botones "+ Añadir"
  irAGastos() {
    this.router.navigate(['/gastos']); // Asegúrate que esta ruta coincide con app.routes.ts
  }

  irAIngresos() {
    this.router.navigate(['/ingresos']);
  }

  irAFijos() {
    this.router.navigate(['/gastos-fijos']);
  }

  onFechaChange() {
    this.cargarDatos();
  }

  formatFecha(fecha: any): string {
    if (!fecha || !Array.isArray(fecha)) return '---';
    const [year, month, day] = fecha;
    return `${day < 10 ? '0'+day : day}/${month < 10 ? '0'+month : month}/${year}`;
  }
}