import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementosComponent } from './form-elementos.component';

describe('FormElementosComponent', () => {
  let component: FormElementosComponent;
  let fixture: ComponentFixture<FormElementosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormElementosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
