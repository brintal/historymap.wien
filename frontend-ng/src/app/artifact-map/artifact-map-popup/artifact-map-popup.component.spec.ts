import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactMapPopupComponent } from './artifact-map-popup.component';

describe('ArtifactMapPopupComponent', () => {
  let component: ArtifactMapPopupComponent;
  let fixture: ComponentFixture<ArtifactMapPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactMapPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactMapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
