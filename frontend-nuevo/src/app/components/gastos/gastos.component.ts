import { Component, OnInit, signal } from '@angular/core'; // 1. Quitamos 'inject' de aquí
import { CommonModule } from '@angular/common';
import { FinanzasService } from '../../services/finanzas.service';
import { Gasto } from '../../models/finanzas.model';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent implements OnInit {
  
  public listaGastos = signal<Gasto[]>([]);

  // 2. Usamos el constructor clásico. Es más robusto para evitar el error NG0203
  constructor(private finanzasService: FinanzasService) {}

  ngOnInit() {
    this.finanzasService.getGastos().subscribe({
      next: (datos) => {
        console.log('¡Conectado a Spring Boot!', datos);
        this.listaGastos.set(datos);
      },
      error: (err) => {
        console.error('Error: ¿Está el Backend encendido?', err);
      }
    });
  }
}