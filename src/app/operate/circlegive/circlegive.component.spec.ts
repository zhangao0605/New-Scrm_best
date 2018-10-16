import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclegiveComponent } from './circlegive.component';

describe('CirclegiveComponent', () => {
  let component: CirclegiveComponent;
  let fixture: ComponentFixture<CirclegiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclegiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclegiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
