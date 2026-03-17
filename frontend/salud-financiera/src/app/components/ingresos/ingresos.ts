// src/app/components/ingresos/ingresos.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanzasService, Ingreso } from '../../services/finanzas.service';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingresos.html',
  styleUrls: ['./ingresos.css']
})
export class Ingresos implements OnInit {

  @Input() month!: number;
  @Input() year!: number;

  nuevoIngreso: Ingreso = { cantidad: 0, descripcion: '' };

  constructor(public finanzasService: FinanzasService) {}

  ngOnInit() {
    if (this.month && this.year) {
      this.finanzasService.getIngresosPorMes(this.year, this.month).subscribe();
    }
  }

  addIngreso() {
    if (this.nuevoIngreso.cantidad <= 0) return;

    const ingreso: Ingreso = {
      ...this.nuevoIngreso,
      mesContabilizacion: `${this.year}-${this.month.toString().padStart(2,'0')}`
    };

    this.finanzasService.addIngreso(ingreso).subscribe(() => {
      this.nuevoIngreso = { cantidad: 0, descripcion: '' };
      // No hace falta llamar getIngresosPorMes aquí porque el servicio lo recarga automáticamente
    });
  }

  get ingresosList() {
    return this.finanzasService.ingresosSignal();
  }
}