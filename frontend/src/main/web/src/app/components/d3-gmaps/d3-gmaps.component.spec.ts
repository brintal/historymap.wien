/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {D3GmapsComponent} from "./d3-gmaps.component";

describe('D3GmapsComponent', () => {
  let component: D3GmapsComponent;
  let fixture: ComponentFixture<D3GmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3GmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3GmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
