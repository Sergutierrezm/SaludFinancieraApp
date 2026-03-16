import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Gasto {
  id?: number;
  fechaGasto?: string;
  mesContabilizacion?: string;
  fechaRegistro?: string;
  comercio?: string;
  cantidad: number;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root' // No hace falta ponerlo en providers del componente
})
export class GastosService {

  private baseUrl = 'http://localhost:8080/gastos';

  constructor(private http: HttpClient) {}

  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.baseUrl);
  }

  getGastosPorMes(year: number, month: number): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.baseUrl}/mes?year=${year}&month=${month}`);
  }

  addGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(this.baseUrl, gasto);
  }

  updateGasto(id: number, gasto: Gasto): Observable<Gasto> {
    return this.http.put<Gasto>(`${this.baseUrl}/${id}`, gasto);
  }

  deleteGasto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}