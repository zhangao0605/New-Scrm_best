import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendcircleComponent } from './sendcircle.component';

describe('SendcircleComponent', () => {
  let component: SendcircleComponent;
  let fixture: ComponentFixture<SendcircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendcircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
