import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 🆕 Importado
import { FinanzasService } from '../../services/finanzas.service';
import { GastoFijo } from '../../models/finanzas.model';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit {
  
  public listaFijos = signal<GastoFijo[]>([]);
  
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

  public nuevoFijo: GastoFijo = this.inicializarFijo();

  constructor(
    private finanzasService: FinanzasService,
    private router: Router // 🆕 Inyectado
  ) {}

  ngOnInit() {
    this.cargarFijos();
  }

  cargarFijos() {
    this.finanzasService.getGastosFijos(this.anioSeleccionado(), this.mesSeleccionado()).subscribe({
      next: (datos) => this.listaFijos.set(datos),
      error: (err) => console.error('Error al cargar fijos:', err)
    });
  }

  guardarFijo() {
    this.nuevoFijo.mesContabilizacion = this.nuevoFijo.fechaInicio.substring(0, 7);
    this.finanzasService.guardarGastoFijo(this.nuevoFijo).subscribe({
      next: (res) => {
        this.cargarFijos();
        this.nuevoFijo = this.inicializarFijo();
      },
      error: (err) => console.error('Error al guardar gasto fijo:', err)
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }

  private inicializarFijo(): GastoFijo {
    return {
      nombre: '',
      cantidad: 0,
      fechaInicio: new Date().toISOString().split('T')[0],
      mesContabilizacion: '',
      descripcion: ''
    };
  }

  onFechaChange() {
    this.cargarFijos();
  }
}