import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarclientesComponent } from './listarclientes.component';

describe('ListarclientesComponent', () => {
  let component: ListarclientesComponent;
  let fixture: ComponentFixture<ListarclientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarclientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
