// src/app/services/finanzas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

export interface GastoFijo {
  id?: number;
  cantidad: number;
  descripcion?: string;
  mesContabilizacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  private baseUrlIngresos = 'http://localhost:8080/ingresos';
  private baseUrlGastos = 'http://localhost:8080/gastos';
  private baseUrlGastosFijos = 'http://localhost:8080/gastosfijos';

  private ingresosSubject = new BehaviorSubject<Ingreso[]>([]);
  private gastosSubject = new BehaviorSubject<Gasto[]>([]);
  private gastosFijosSubject = new BehaviorSubject<GastoFijo[]>([]);

  ingresos$ = this.ingresosSubject.asObservable();
  gastos$ = this.gastosSubject.asObservable();
  gastosFijos$ = this.gastosFijosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // --- INGRESOS ---
  getIngresosPorMes(year: number, month: number) {
    return this.http.get<Ingreso[]>(`${this.baseUrlIngresos}/mes?year=${year}&month=${month}`)
      .pipe(tap(data => this.ingresosSubject.next(data)));
  }

  addIngreso(ingreso: Ingreso): Observable<Ingreso> {
    return this.http.post<Ingreso>(this.baseUrlIngresos, ingreso)
      .pipe(tap(() => {
        const [y, m] = ingreso.mesContabilizacion!.split('-').map(Number);
        this.getIngresosPorMes(y, m).subscribe();
      }));
  }

  ingresosSignal() {
    return this.ingresosSubject.getValue();
  }

  // --- GASTOS ---
  getGastosPorMes(year: number, month: number) {
    return this.http.get<Gasto[]>(`${this.baseUrlGastos}/mes?year=${year}&month=${month}`)
      .pipe(tap(data => this.gastosSubject.next(data)));
  }

  addGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(this.baseUrlGastos, gasto)
      .pipe(tap(() => {
        const [y, m] = gasto.mesContabilizacion!.split('-').map(Number);
        this.getGastosPorMes(y, m).subscribe();
      }));
  }

  gastosSignal() {
    return this.gastosSubject.getValue();
  }

  // --- GASTOS FIJOS ---
  getGastosFijosPorMes(year: number, month: number) {
    return this.http.get<GastoFijo[]>(`${this.baseUrlGastosFijos}/mes?year=${year}&month=${month}`)
      .pipe(tap(data => this.gastosFijosSubject.next(data)));
  }

  addGastoFijo(gasto: GastoFijo): Observable<GastoFijo> {
    return this.http.post<GastoFijo>(this.baseUrlGastosFijos, gasto)
      .pipe(tap(() => {
        const [y, m] = gasto.mesContabilizacion!.split('-').map(Number);
        this.getGastosFijosPorMes(y, m).subscribe();
      }));
  }

  gastosFijosSignal() {
    return this.gastosFijosSubject.getValue();
  }
}