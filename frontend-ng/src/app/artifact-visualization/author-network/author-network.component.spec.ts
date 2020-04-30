import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorNetworkComponent } from './author-network.component';

describe('AuthorNetworkComponent', () => {
  let component: AuthorNetworkComponent;
  let fixture: ComponentFixture<AuthorNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
