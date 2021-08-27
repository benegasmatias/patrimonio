import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasEntradaComponent } from './estadisticas-entrada.component';

describe('EstadisticasEntradaComponent', () => {
  let component: EstadisticasEntradaComponent;
  let fixture: ComponentFixture<EstadisticasEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
