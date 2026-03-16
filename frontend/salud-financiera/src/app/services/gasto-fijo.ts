import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GastoFijo {
  id?: number;
  nombre: string;
  cantidad: number;
  fechaInicio?: string;
  fechaFin?: string;
  mesContabilizacion?: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GastosFijosService {

  private baseUrl = 'http://localhost:8080/gastosfijos';

  constructor(private http: HttpClient) {}

  getGastosFijos(): Observable<GastoFijo[]> {
    return this.http.get<GastoFijo[]>(this.baseUrl);
  }

  getGastosFijosPorMes(year: number, month: number): Observable<GastoFijo[]> {
    return this.http.get<GastoFijo[]>(`${this.baseUrl}/mes?year=${year}&month=${month}`);
  }

  addGastoFijo(gasto: GastoFijo): Observable<GastoFijo> {
    return this.http.post<GastoFijo>(this.baseUrl, gasto);
  }

  updateGastoFijo(id: number, gasto: GastoFijo): Observable<GastoFijo> {
    return this.http.put<GastoFijo>(`${this.baseUrl}/${id}`, gasto);
  }

  deleteGastoFijo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
