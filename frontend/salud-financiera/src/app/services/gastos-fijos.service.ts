import { signal } from '@angular/core';
import { GastoFijo } from './models';

export class GastosFijosService {
  private _gastosFijos = signal<GastoFijo[]>([]);

  getGastosFijos() {
    return this._gastosFijos;
  }

  addGasto(gasto: GastoFijo) {
    this._gastosFijos.set([...this._gastosFijos(), gasto]);
  }
}