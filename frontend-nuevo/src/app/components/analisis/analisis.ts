import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanzasService } from '../../services/finanzas.service';

@Component({
  selector: 'app-analisis',
  standalone: true,
  imports: [CommonModule, FormsModule], // Necesarios para el [(ngModel)] y el *ngIf
  templateUrl: './analisis.html',
  styleUrl: './analisis.css'
})
export class AnalisisComponent {
  // Inicializamos con el mes actual en formato YYYY-MM
  mesSeleccionado: string = new Date().toISOString().substring(0, 7); 
  informeIA: string = '';
  cargando: boolean = false;
  errorMsg: string = '';

  constructor(private finanzasService: FinanzasService) {}

  solicitarAnalisisIA() {
    this.cargando = true;
    this.informeIA = '';
    this.errorMsg = '';

    // Llamamos al método que añadimos antes al FinanzasService
    this.finanzasService.getAnalisisCompleto(this.mesSeleccionado).subscribe({
      next: (respuesta) => {
        this.informeIA = respuesta;
        this.cargando = false;
      },
      error: (err) => {
        console.error("Error en la IA:", err);
        this.errorMsg = "No se ha podido generar el informe. Asegúrate de que el servidor y Ollama estén funcionando.";
        this.cargando = false;
      }
    });
  }
}
