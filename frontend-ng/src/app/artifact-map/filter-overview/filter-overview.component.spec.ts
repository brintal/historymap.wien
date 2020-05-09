import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOverviewComponent } from './filter-overview.component';

describe('FilterOverviewComponent', () => {
  let component: FilterOverviewComponent;
  let fixture: ComponentFixture<FilterOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
