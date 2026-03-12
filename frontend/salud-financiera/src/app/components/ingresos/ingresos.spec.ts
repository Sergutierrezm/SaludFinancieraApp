import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ingresos } from './ingresos';

describe('Ingresos', () => {
  let component: Ingresos;
  let fixture: ComponentFixture<Ingresos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ingresos],
    }).compileComponents();

    fixture = TestBed.createComponent(Ingresos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
