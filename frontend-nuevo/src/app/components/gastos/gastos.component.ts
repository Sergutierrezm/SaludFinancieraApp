import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; // 🆕 Importado
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

  nombreMesActual = computed(() => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[this.mesSeleccionado() - 1] || 'Mes';
  });

  public nuevoGasto: Gasto = this.inicializarGasto();

  constructor(
    private finanzasService: FinanzasService,
    private router: Router // 🆕 Inyectado
  ) {}

  ngOnInit() {
    this.cargarGastos();
  }

  cargarGastos() {
    this.finanzasService.getGastos(this.anioSeleccionado(), this.mesSeleccionado()).subscribe({
      next: (datos) => this.listaGastos.set(datos),
      error: (err) => console.error('Error al cargar gastos:', err)
    });
  }

  guardarGasto() {
    this.nuevoGasto.mesContabilizacion = this.nuevoGasto.fechaGasto.substring(0, 7);
    this.finanzasService.guardarGasto(this.nuevoGasto).subscribe({
      next: (res) => {
        this.cargarGastos(); 
        this.nuevoGasto = this.inicializarGasto(); 
      },
      error: (err: any) => console.error('Error al guardar:', err)
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
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