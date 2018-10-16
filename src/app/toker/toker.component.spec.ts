import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokerComponent } from './toker.component';

describe('TokerComponent', () => {
  let component: TokerComponent;
  let fixture: ComponentFixture<TokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
