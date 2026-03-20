import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  public mostrarFormulario = signal(false);
  
  // Filtros para la tabla
  anioSeleccionado = signal(new Date().getFullYear());
  mesSeleccionado = signal(new Date().getMonth() + 1);

  // Objeto para el formulario (usando los campos de tu DTO/Entity)
  public nuevoFijo: GastoFijo = this.inicializarFijo();

  constructor(private finanzasService: FinanzasService) {}

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
    // Generamos el formato "YYYY-MM" para el YearMonth de Java
    this.nuevoFijo.mesContabilizacion = this.nuevoFijo.fechaInicio.substring(0, 7);

    this.finanzasService.guardarGastoFijo(this.nuevoFijo).subscribe({
      next: (res) => {
        console.log('✅ Gasto fijo guardado:', res);
        this.cargarFijos(); // Refrescar lista
        this.nuevoFijo = this.inicializarFijo(); // Resetear campos
        this.mostrarFormulario.set(false); // Cerrar formulario
      },
      error: (err) => console.error('Error al guardar gasto fijo:', err)
    });
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