import { signal } from '@angular/core';
import { Gasto } from './models';

export class GastosService {
  private _gastos = signal<Gasto[]>([]);

  getGastos() {
    return this._gastos;
  }

  addGasto(gasto: Gasto) {
    this._gastos.set([...this._gastos(), gasto]);
  }
}