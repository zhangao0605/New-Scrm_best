import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollownumberComponent } from './follownumber.component';

describe('FollownumberComponent', () => {
  let component: FollownumberComponent;
  let fixture: ComponentFixture<FollownumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollownumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollownumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
