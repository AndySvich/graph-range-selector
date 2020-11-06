import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRangeSelectorComponent } from './graph-range-selector.component';

describe('GraphRangeSelectorComponent', () => {
  let component: GraphRangeSelectorComponent;
  let fixture: ComponentFixture<GraphRangeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphRangeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
