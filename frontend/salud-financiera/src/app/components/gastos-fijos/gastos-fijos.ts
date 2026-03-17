import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanzasService, GastoFijo } from '../../services/finanzas.service';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos-fijos.html',
  styleUrls: ['./gastos-fijos.css']
})
export class GastosFijosComponent implements OnInit {

  @Input() month!: number;
  @Input() year!: number;

  nuevoGastoFijo: GastoFijo = { cantidad: 0, descripcion: '' };

  constructor(public finanzasService: FinanzasService) {}

  ngOnInit() {
    this.finanzasService.getGastosFijosPorMes(this.year, this.month).subscribe();
  }

  addGastoFijo() {
    if (this.nuevoGastoFijo.cantidad <= 0) return;

    const gastoFijo: GastoFijo = {
      ...this.nuevoGastoFijo,
      mesContabilizacion: `${this.year}-${this.month.toString().padStart(2,'0')}`
    };

    this.finanzasService.addGastoFijo(gastoFijo).subscribe(() => {
      this.nuevoGastoFijo = { cantidad: 0, descripcion: '' };
    });
  }

  get gastosFijosList() {
    return this.finanzasService.gastosFijosSignal();
  }
}