import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanzasService, Gasto } from '../../services/finanzas.service';

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

  nuevoGasto: Gasto = { cantidad: 0, descripcion: '' };

  constructor(public finanzasService: FinanzasService) {}

  ngOnInit() {
    this.finanzasService.getGastosPorMes(this.year, this.month).subscribe();
  }

  addGasto() {
    if (this.nuevoGasto.cantidad <= 0) return;

    const gasto: Gasto = {
      ...this.nuevoGasto,
      mesContabilizacion: `${this.year}-${this.month.toString().padStart(2,'0')}`
    };

    this.finanzasService.addGasto(gasto).subscribe(() => {
      this.nuevoGasto = { cantidad: 0, descripcion: '' };
    });
  }

  get gastosList() {
    return this.finanzasService.gastosSignal();
  }
}
