import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
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
  
  // Control de fecha
  anioSeleccionado = signal(new Date().getFullYear());
  mesSeleccionado = signal(new Date().getMonth() + 1);

  // Nombre del mes reactivo
  nombreMesActual = computed(() => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[this.mesSeleccionado() - 1] || 'Mes';
  });

  public nuevoIngreso: Ingreso = this.inicializarIngreso();

  constructor(
    private finanzasService: FinanzasService,
    private router: Router
  ) {}

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
    // Formato YYYY-MM para el backend
    this.nuevoIngreso.mesContabilizacion = this.nuevoIngreso.fechaIngreso.substring(0, 7);

    this.finanzasService.guardarIngreso(this.nuevoIngreso).subscribe({
      next: (res) => {
        console.log('✅ Ingreso registrado');
        this.cargarIngresos(); // Refrescar lista lateral
        this.nuevoIngreso = this.inicializarIngreso(); // Resetear form
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
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