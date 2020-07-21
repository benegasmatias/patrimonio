import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaFormComponent } from './salida-form.component';

describe('SalidaFormComponent', () => {
  let component: SalidaFormComponent;
  let fixture: ComponentFixture<SalidaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
