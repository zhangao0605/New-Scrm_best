import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardcircleComponent } from './forwardcircle.component';

describe('ForwardcircleComponent', () => {
  let component: ForwardcircleComponent;
  let fixture: ComponentFixture<ForwardcircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardcircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
