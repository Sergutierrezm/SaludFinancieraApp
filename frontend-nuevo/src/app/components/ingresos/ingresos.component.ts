import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanzasService } from '../../services/finanzas.service';
import { Ingreso } from '../../models/finanzas.model';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css'
})
export class IngresosComponent implements OnInit {
  
  public listaIngresos = signal<Ingreso[]>([]);
  public mostrarFormulario = signal(false);
  
  // Filtros de fecha
  anioSeleccionado = signal(new Date().getFullYear());
  mesSeleccionado = signal(new Date().getMonth() + 1);

  public nuevoIngreso: Ingreso = this.inicializarIngreso();

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit() {
    this.cargarIngresos();
  }

  cargarIngresos() {
    this.finanzasService.getIngresos(this.anioSeleccionado(), this.mesSeleccionado()).subscribe({
      next: (datos) => this.listaIngresos.set(datos),
      error: (err) => console.error('Error cargando ingresos:', err)
    });
  }

  guardarIngreso() {
    // Formateamos para el YearMonth de Java (YYYY-MM)
    this.nuevoIngreso.mesContabilizacion = this.nuevoIngreso.fechaIngreso.substring(0, 7);

    this.finanzasService.guardarIngreso(this.nuevoIngreso).subscribe({
      next: (res) => {
        console.log('✅ Ingreso guardado:', res);
        this.cargarIngresos();
        this.nuevoIngreso = this.inicializarIngreso();
        this.mostrarFormulario.set(false);
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }

  private inicializarIngreso(): Ingreso {
    return {
      fechaIngreso: new Date().toISOString().split('T')[0],
      origen: '',
      cantidad: 0,
      mesContabilizacion: '',
      descripcion: ''
    };
  }

  onFechaChange() {
    this.cargarIngresos();
  }
}