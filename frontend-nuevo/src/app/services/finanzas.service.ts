import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto, GastoFijo, Ingreso } from '../models/finanzas.model';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  private readonly apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  getIngresos(year: number, month: number): Observable<Ingreso[]> {
    const params = new HttpParams().set('year', year.toString()).set('month', month.toString());
    return this.http.get<Ingreso[]>(`${this.apiUrl}/ingresos/mes`, { params });
  }

  getGastosFijos(year: number, month: number): Observable<GastoFijo[]> {
    const params = new HttpParams().set('year', year.toString()).set('month', month.toString());
    return this.http.get<GastoFijo[]>(`${this.apiUrl}/gastosfijos/mes`, { params });
  }

  getGastos(year: number, month: number): Observable<Gasto[]> {
    const params = new HttpParams().set('year', year.toString()).set('month', month.toString());
    return this.http.get<Gasto[]>(`${this.apiUrl}/gastos/mes`, { params });
  }

  // Añade esto justo antes de la última llave }
  guardarGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${this.apiUrl}/gastos`, gasto);
  }

}