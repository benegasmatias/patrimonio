import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaListaComponent } from './salida-lista.component';

describe('SalidaListaComponent', () => {
  let component: SalidaListaComponent;
  let fixture: ComponentFixture<SalidaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
