import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypestructComponent } from './typestruct.component';

describe('TypestructComponent', () => {
  let component: TypestructComponent;
  let fixture: ComponentFixture<TypestructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypestructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypestructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
