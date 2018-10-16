import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridentcircleComponent } from './fridentcircle.component';

describe('FridentcircleComponent', () => {
  let component: FridentcircleComponent;
  let fixture: ComponentFixture<FridentcircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridentcircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridentcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
