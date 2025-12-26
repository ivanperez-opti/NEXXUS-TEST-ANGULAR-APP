import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasFormulario } from './ventas-formulario';

describe('VentasFormulario', () => {
  let component: VentasFormulario;
  let fixture: ComponentFixture<VentasFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
