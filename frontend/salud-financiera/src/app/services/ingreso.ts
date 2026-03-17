import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Ingreso {
  id?: number;
  cantidad: number;
  descripcion?: string;
  mesContabilizacion?: string;
}

export interface Gasto {
  id?: number;
  cantidad: number;
  descripcion?: string;
  mesContabilizacion?: string;
}

@Injectable({ providedIn: 'root' })
export class FinanzasService {

  ingresosSignal = signal<Ingreso[]>([]);
  gastosSignal = signal<Gasto[]>([]);

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // INGRESOS
  getIngresosPorMes(year: number, month: number): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.baseUrl}/ingresos/mes?year=${year}&month=${month}`)
      .pipe(tap(data => this.ingresosSignal.set(data)));
  }

  addIngreso(ingreso: Ingreso): Observable<Ingreso> {
    return this.http.post<Ingreso>(`${this.baseUrl}/ingresos`, ingreso).pipe(
      tap(() => {
        const [year, month] = ingreso.mesContabilizacion!.split('-').map(Number);
        this.getIngresosPorMes(year, month).subscribe();
      })
    );
  }

  // GASTOS
  getGastosPorMes(year: number, month: number): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.baseUrl}/gastos/mes?year=${year}&month=${month}`)
      .pipe(tap(data => this.gastosSignal.set(data)));
  }

  addGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${this.baseUrl}/gastos`, gasto).pipe(
      tap(() => {
        const [year, month] = gasto.mesContabilizacion!.split('-').map(Number);
        this.getGastosPorMes(year, month).subscribe();
      })
    );
  }
}