import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBubblesComponent } from './author-bubbles.component';

describe('AuthorBubblesComponent', () => {
  let component: AuthorBubblesComponent;
  let fixture: ComponentFixture<AuthorBubblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorBubblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
