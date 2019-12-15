import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactImagePopupComponent } from './artifact-image-popup.component';

describe('ArtifactImagePopupComponent', () => {
  let component: ArtifactImagePopupComponent;
  let fixture: ComponentFixture<ArtifactImagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactImagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
