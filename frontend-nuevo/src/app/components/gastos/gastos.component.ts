import { Component, OnInit, signal, computed } from '@angular/core'; // 🆕 Importamos computed
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
  
  // --- CONTROL DE FECHA ---
  anioSeleccionado = signal(new Date().getFullYear());
  mesSeleccionado = signal(new Date().getMonth() + 1);

  // 🆕 OPTION B: Signal computado para el nombre del mes
  // Se actualiza solo cuando mesSeleccionado cambia
  nombreMesActual = computed(() => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[this.mesSeleccionado() - 1];
  });

  // --- FORMULARIO ---
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
        console.log(`Datos actualizados para: ${this.nombreMesActual()} ${anio}`);
      },
      error: (err) => console.error('Error al conectar con el servidor:', err)
    });
  }

  guardarGasto() {
    // Calculamos el mesContabilizacion automáticamente (ej: "2026-03")
    this.nuevoGasto.mesContabilizacion = this.nuevoGasto.fechaGasto.substring(0, 7);

    this.finanzasService.guardarGasto(this.nuevoGasto).subscribe({
      next: (res) => {
        console.log('✅ Gasto guardado con éxito:', res);
        this.cargarGastos(); 
        this.nuevoGasto = this.inicializarGasto(); 
        this.mostrarFormulario.set(false); 
      },
      error: (err: any) => console.error('Error al guardar:', err)
    });
  }

  private inicializarGasto(): Gasto {
    return {
      fechaGasto: new Date().toISOString().split('T')[0],
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