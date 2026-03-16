import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingreso {
  id?: number;
  origen?: string;
  cantidad: number;
  fechaIngreso?: string;
  mesContabilizacion?: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root' // Evita que tengas que ponerlo en providers del componente
})
export class IngresosService {

  private baseUrl = 'http://localhost:8080/ingresos'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  getIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(this.baseUrl);
  }

  getIngresosPorMes(year: number, month: number): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.baseUrl}/mes?year=${year}&month=${month}`);
  }

  addIngreso(ingreso: Ingreso): Observable<Ingreso> {
    return this.http.post<Ingreso>(this.baseUrl, ingreso);
  }

  updateIngreso(id: number, ingreso: Ingreso): Observable<Ingreso> {
    return this.http.put<Ingreso>(`${this.baseUrl}/${id}`, ingreso);
  }

  deleteIngreso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}