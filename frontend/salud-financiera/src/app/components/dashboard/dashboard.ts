// src/app/components/dashboard/dashboard.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  @Input() month!: number;
  @Input() year!: number;

  constructor(public finanzasService: FinanzasService) {}

  ngOnInit() {
    if (this.month && this.year) {
      this.finanzasService.getIngresosPorMes(this.year, this.month).subscribe();
      this.finanzasService.getGastosPorMes(this.year, this.month).subscribe();
      this.finanzasService.getGastosFijosPorMes(this.year, this.month).subscribe();
    }
  }

  get totalIngresos() {
    return this.finanzasService.ingresosSignal().reduce((a: number, b) => a + b.cantidad, 0);
  }

  get totalGastos() {
    const gastosNormales = this.finanzasService.gastosSignal().reduce((a: number, b) => a + b.cantidad, 0);
    const gastosFijos = this.finanzasService.gastosFijosSignal().reduce((a: number, b) => a + b.cantidad, 0);
    return gastosNormales + gastosFijos;
  }

  get saldo() {
    return this.totalIngresos - this.totalGastos;
  }
}