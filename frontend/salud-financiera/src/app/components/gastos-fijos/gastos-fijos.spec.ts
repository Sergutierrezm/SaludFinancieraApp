import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosFijos } from './gastos-fijos';

describe('GastosFijos', () => {
  let component: GastosFijos;
  let fixture: ComponentFixture<GastosFijos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosFijos],
    }).compileComponents();

    fixture = TestBed.createComponent(GastosFijos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
