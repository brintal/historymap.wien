import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniqueSunburstComponent } from './technique-sunburst.component';

describe('TechniqueSunburstComponent', () => {
  let component: TechniqueSunburstComponent;
  let fixture: ComponentFixture<TechniqueSunburstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniqueSunburstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniqueSunburstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
