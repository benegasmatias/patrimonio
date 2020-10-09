import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalidasComponent } from './list-salidas.component';

describe('ListSalidasComponent', () => {
  let component: ListSalidasComponent;
  let fixture: ComponentFixture<ListSalidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
