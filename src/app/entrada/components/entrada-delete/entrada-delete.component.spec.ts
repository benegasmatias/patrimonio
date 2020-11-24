import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaDeleteComponent } from './entrada-delete.component';

describe('EntradaDeleteComponent', () => {
  let component: EntradaDeleteComponent;
  let fixture: ComponentFixture<EntradaDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
