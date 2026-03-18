import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GastosFijosService } from '../../services/gastos-fijos.service';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos-fijos.component.html',
})
export class GastosFijosComponent {
  descripcion = '';
  cantidad = 0;

  constructor(public gastosFijosService: GastosFijosService) {}

  agregarGastoFijo() {
    this.gastosFijosService.addGasto({ descripcion: this.descripcion, cantidad: this.cantidad });
    this.descripcion = '';
    this.cantidad = 0;
  }
}