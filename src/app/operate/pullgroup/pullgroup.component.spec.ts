import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullgroupComponent } from './pullgroup.component';

describe('PullgroupComponent', () => {
  let component: PullgroupComponent;
  let fixture: ComponentFixture<PullgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
