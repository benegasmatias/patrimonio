import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarClientesComponent } from './navbar-clientes.component';

describe('NavbarClientesComponent', () => {
  let component: NavbarClientesComponent;
  let fixture: ComponentFixture<NavbarClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
