import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngresosService, Ingreso } from '../../services/ingreso';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingresos.html',
  styleUrls: ['./ingresos.css']
})
export class Ingresos implements OnInit {

  @Input() month!: number;
  @Input() year!: number;

  // Lista de ingresos del mes actual
  ingresosList = signal<Ingreso[]>([]);

  // Modelo para el formulario
  nuevoIngreso: Ingreso = {
    cantidad: 0,
    descripcion: ''
  };

  constructor(private ingresosService: IngresosService) {}

  ngOnInit() {
    this.cargarIngresos();
  }

  // Cargar ingresos del mes/año actual
  cargarIngresos() {
    if (!this.month || !this.year) return;

    this.ingresosService.getIngresosPorMes(this.year, this.month).subscribe({
      next: (data: Ingreso[]) => this.ingresosList.set(data),
      error: (err: any) => console.error(err)
    });
  }

  // Añadir un nuevo ingreso al mes actual
  addIngreso() {
    if (this.nuevoIngreso.cantidad <= 0) return;

    const ingresoParaBackend: Ingreso = {
      ...this.nuevoIngreso,
      mesContabilizacion: `${this.year}-${this.month.toString().padStart(2,'0')}`
    };

    this.ingresosService.addIngreso(ingresoParaBackend).subscribe({
      next: () => {
        this.cargarIngresos(); // recargar la lista
        this.nuevoIngreso = { cantidad: 0, descripcion: '' }; // reset formulario
      },
      error: (err: any) => console.error(err)
    });
  }
}