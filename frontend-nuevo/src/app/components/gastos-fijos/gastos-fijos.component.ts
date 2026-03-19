import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Asegúrate de tener esto
import { FinanzasService } from '../../services/finanzas.service';
import { GastoFijo } from '../../models/finanzas.model';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent implements OnInit {
  public listaFijos = signal<GastoFijo[]>([]);
  
  // 1. Añadimos los controles de fecha
  anioSeleccionado = signal(new Date().getFullYear());
  mesSeleccionado = signal(new Date().getMonth() + 1);

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  // 2. Pasamos el año y el mes al servicio
  cargarDatos() {
    const anio = this.anioSeleccionado();
    const mes = this.mesSeleccionado();

    this.finanzasService.getGastosFijos(anio, mes).subscribe({
      next: (datos) => {
        this.listaFijos.set(datos);
      },
      error: (err: any) => console.error('Error al cargar fijos:', err)
    });
  }

  // 3. Gatillo para cuando cambies el selector en el HTML
  onFechaChange() {
    this.cargarDatos();
  }
}