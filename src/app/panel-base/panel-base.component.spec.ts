import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBaseComponent } from './panel-base.component';

describe('PanelBaseComponent', () => {
  let component: PanelBaseComponent;
  let fixture: ComponentFixture<PanelBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
