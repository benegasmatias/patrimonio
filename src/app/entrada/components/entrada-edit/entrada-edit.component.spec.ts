import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaEditComponent } from './entrada-edit.component';

describe('EntradaEditComponent', () => {
  let component: EntradaEditComponent;
  let fixture: ComponentFixture<EntradaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
