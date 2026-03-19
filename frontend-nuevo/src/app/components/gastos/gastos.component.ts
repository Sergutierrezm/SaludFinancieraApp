import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { FinanzasService } from '../../services/finanzas.service';
import { Gasto } from '../../models/finanzas.model';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent implements OnInit {
  
  public listaGastos = signal<Gasto[]>([]);
  
  anioSeleccionado = signal(new Date().getFullYear());
  mesSeleccionado = signal(new Date().getMonth() + 1);

  // 🆕 1. Objeto para el formulario y control de visibilidad
  public mostrarFormulario = signal(false);
  public nuevoGasto: Gasto = this.inicializarGasto();

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit() {
    this.cargarGastos();
  }

  cargarGastos() {
    const anio = this.anioSeleccionado();
    const mes = this.mesSeleccionado();

    this.finanzasService.getGastos(anio, mes).subscribe({
      next: (datos) => {
        this.listaGastos.set(datos);
        console.log(`Datos actualizados para: ${mes}/${anio}`);
      },
      error: (err) => console.error('Error al conectar con el servidor:', err)
    });
  }

  // 🆕 2. Función para enviar el gasto al Backend
  guardarGasto() {
    // Calculamos el mesContabilizacion automáticamente (ej: "2026-03")
    this.nuevoGasto.mesContabilizacion = this.nuevoGasto.fechaGasto.substring(0, 7);

    this.finanzasService.guardarGasto(this.nuevoGasto).subscribe({
      next: (res) => {
        console.log('✅ Gasto guardado con éxito:', res);
        this.cargarGastos(); // Recargamos la lista para ver el nuevo gasto
        this.nuevoGasto = this.inicializarGasto(); // Limpiamos los campos
        this.mostrarFormulario.set(false); // Cerramos el panel
      },
      error: (err: any) => console.error('Error al guardar:', err)
    });
  }

  // 🆕 3. Función auxiliar para resetear el objeto
  private inicializarGasto(): Gasto {
    return {
      fechaGasto: new Date().toISOString().split('T')[0], // Fecha de hoy
      mesContabilizacion: '',
      comercio: '',
      cantidad: 0,
      descripcion: ''
    };
  }

  onFechaChange() {
    this.cargarGastos();
  }
}