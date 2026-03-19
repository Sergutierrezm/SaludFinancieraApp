import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto, GastoFijo, Ingreso } from '../models/finanzas.model';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  // Ponemos la URL como una constante clara
  private readonly apiUrl = 'http://localhost:8080/api'; 

  // Usamos el constructor clásico para que TypeScript no se pierda con 'this'
  constructor(private http: HttpClient) {
    console.log('✅ FinanzasService inicializado correctamente');
  }

  // --- INGRESOS ---
  getIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.apiUrl}/ingresos`);
  }

  // --- GASTOS FIJOS ---
  getGastosFijos(): Observable<GastoFijo[]> {
    return this.http.get<GastoFijo[]>(`${this.apiUrl}/gastos-fijos`);
  }

  // --- GASTOS VARIABLES ---
  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}/gastos`);
  }

  // Método para crear un gasto
  crearGasto(nuevoGasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${this.apiUrl}/gastos`, nuevoGasto);
  }


}