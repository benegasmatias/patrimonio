import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFormComponent } from './pending-form.component';

describe('PendingFormComponent', () => {
  let component: PendingFormComponent;
  let fixture: ComponentFixture<PendingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
