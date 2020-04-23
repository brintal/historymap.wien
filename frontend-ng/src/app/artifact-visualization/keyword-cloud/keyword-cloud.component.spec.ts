import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordCloudComponent } from './keyword-cloud.component';

describe('KeywordCloudComponent', () => {
  let component: KeywordCloudComponent;
  let fixture: ComponentFixture<KeywordCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
