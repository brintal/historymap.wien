/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {BrushSnappingComponent} from "./brush-snapping.component";

describe('BrushSnappingComponent', () => {
  let component: BrushSnappingComponent;
  let fixture: ComponentFixture<BrushSnappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushSnappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushSnappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
