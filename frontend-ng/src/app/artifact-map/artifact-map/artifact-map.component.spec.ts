import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactMapComponent } from './artifact-map.component';

describe('ArtifactMapComponent', () => {
  let component: ArtifactMapComponent;
  let fixture: ComponentFixture<ArtifactMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
