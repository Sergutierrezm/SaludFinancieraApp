import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GastosFijosService, GastoFijo } from '../../services/gasto-fijo';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos-fijos.html',
  styleUrls: ['./gastos-fijos.css']
})
export class GastosFijos implements OnInit {

  @Input() month!: number;
  @Input() year!: number;

  gastosFijosList = signal<GastoFijo[]>([]);

  nuevoGasto: Partial<GastoFijo> = {
    nombre: '',
    cantidad: 0,
    descripcion: ''
  };

  constructor(private gastosFijosService: GastosFijosService) {}

  ngOnInit() {
    this.cargarGastosFijos();
  }

  cargarGastosFijos() {
    if (!this.month || !this.year) return;

    this.gastosFijosService.getGastosFijosPorMes(this.year, this.month).subscribe({
      next: (data: GastoFijo[]) => this.gastosFijosList.set(data),
      error: (err: any) => console.error(err)
    });
  }

  addGastoFijo() {
    if (!this.nuevoGasto.nombre || !this.nuevoGasto.cantidad) return;

    const gastoParaBackend: GastoFijo = {
      ...this.nuevoGasto,
      mesContabilizacion: `${this.year}-${this.month.toString().padStart(2,'0')}` 
    } as GastoFijo;

    this.gastosFijosService.addGastoFijo(gastoParaBackend).subscribe({
      next: () => {
        this.cargarGastosFijos();
        this.nuevoGasto = { nombre: '', cantidad: 0, descripcion: '' };
      },
      error: (err: any) => console.error(err)
    });
  }

  deleteGastoFijo(id: number) {
    this.gastosFijosService.deleteGastoFijo(id).subscribe({
      next: () => this.cargarGastosFijos(),
      error: (err: any) => console.error(err)
    });
  }
}