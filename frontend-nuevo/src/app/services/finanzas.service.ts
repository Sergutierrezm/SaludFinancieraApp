import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto, GastoFijo, Ingreso } from '../models/finanzas.model';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  // Quitamos '/api' porque tu Controller de Java no lo tiene
  private readonly apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {
    console.log('✅ FinanzasService inicializado correctamente');
  }

  // Ahora esto llamará a http://localhost:8080/ingresos
  getIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.apiUrl}/ingresos`);
  }

  // Asegúrate de que en Java tus otros Controllers también 
  // coincidan (ej: @RequestMapping("/gastos"))
  getGastosFijos(): Observable<GastoFijo[]> {
    return this.http.get<GastoFijo[]>(`${this.apiUrl}/gastosfijos`);
  }

  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}/gastos`);
  }
}