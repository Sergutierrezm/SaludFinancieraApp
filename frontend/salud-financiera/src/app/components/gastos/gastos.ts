import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GastosService, Gasto } from '../../services/gasto';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos.html',
  styleUrls: ['./gastos.css']
})
export class GastosComponent implements OnInit {

  @Input() month!: number;
  @Input() year!: number;

  gastosList = signal<Gasto[]>([]);

  nuevoGasto: Gasto = {
    cantidad: 0,
    descripcion: ''
  };

  constructor(private gastosService: GastosService) {}

  ngOnInit() {
    this.cargarGastos();
  }

  cargarGastos() {
    if (!this.month || !this.year) return;
    this.gastosService.getGastosPorMes(this.year, this.month).subscribe({
      next: (data: Gasto[]) => this.gastosList.set(data),
      error: (err: any) => console.error(err)
    });
  }

  addGasto() {
    if (this.nuevoGasto.cantidad <= 0) return;

    const gastoParaBackend: Gasto = {
      ...this.nuevoGasto,
      mesContabilizacion: `${this.year}-${this.month.toString().padStart(2,'0')}`
    };

    this.gastosService.addGasto(gastoParaBackend).subscribe({
      next: () => {
        this.cargarGastos();
        this.nuevoGasto = { cantidad: 0, descripcion: '' };
      },
      error: (err: any) => console.error(err)
    });
  }

  borrarGasto(id?: number) {
    if (!id) return;
    this.gastosService.deleteGasto(id).subscribe({
      next: () => this.cargarGastos(),
      error: (err: any) => console.error(err)
    });
  }
}
