import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribenumberComponent } from './subscribenumber.component';

describe('SubscribenumberComponent', () => {
  let component: SubscribenumberComponent;
  let fixture: ComponentFixture<SubscribenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
