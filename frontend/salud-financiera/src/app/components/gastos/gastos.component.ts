import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GastosService } from '../../services/gastos.service';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos.component.html',
})
export class GastosComponent {
  descripcion = '';
  cantidad = 0;

  constructor(public gastosService: GastosService) {}

  agregarGasto() {
    this.gastosService.addGasto({ descripcion: this.descripcion, cantidad: this.cantidad });
    this.descripcion = '';
    this.cantidad = 0;
  }
}