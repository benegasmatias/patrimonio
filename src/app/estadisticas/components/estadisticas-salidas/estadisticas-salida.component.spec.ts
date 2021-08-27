import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasSalidaComponent } from './estadisticas-salida.component';

describe('EstadisticasSalidaComponent', () => {
  let component: EstadisticasSalidaComponent;
  let fixture: ComponentFixture<EstadisticasSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
