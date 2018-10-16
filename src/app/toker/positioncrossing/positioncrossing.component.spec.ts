import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositioncrossingComponent } from './positioncrossing.component';

describe('PositioncrossingComponent', () => {
  let component: PositioncrossingComponent;
  let fixture: ComponentFixture<PositioncrossingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositioncrossingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositioncrossingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
