import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodatComponent } from './editNodat-form.component';

describe('EditNodatComponent', () => {
  let component: EditNodatComponent;
  let fixture: ComponentFixture<EditNodatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNodatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
