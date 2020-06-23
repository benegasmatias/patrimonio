import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilclientesComponent } from './perfilclientes.component';

describe('PerfilclientesComponent', () => {
  let component: PerfilclientesComponent;
  let fixture: ComponentFixture<PerfilclientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilclientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
