import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalBarChartComponent } from './temporal-bar-chart.component';

describe('TemporalBarChartComponent', () => {
  let component: TemporalBarChartComponent;
  let fixture: ComponentFixture<TemporalBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
