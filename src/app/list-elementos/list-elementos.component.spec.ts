import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElementosComponent } from './list-elementos.component';

describe('ListElementosComponent', () => {
  let component: ListElementosComponent;
  let fixture: ComponentFixture<ListElementosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListElementosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
