import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Vital para el *ngFor
import { FinanzasService } from '../../services/finanzas.service';
import { GastoFijo } from '../../models/finanzas.model';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [CommonModule], // Añadimos CommonModule aquí
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css',
})
export class GastosFijosComponent implements OnInit {
  
  // Usamos un signal para que la tabla se actualice sola
  public listaFijos = signal<GastoFijo[]>([]);

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit() {
    this.finanzasService.getGastosFijos().subscribe({
      next: (datos: GastoFijo[]) => {
        console.log('Gastos fijos recibidos:', datos);
        this.listaFijos.set(datos);
      },
      error: (err) => console.error('Error al cargar fijos:', err)
    });
  }
}