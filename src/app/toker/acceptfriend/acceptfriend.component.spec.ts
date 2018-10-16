import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptfriendComponent } from './acceptfriend.component';

describe('AcceptfriendComponent', () => {
  let component: AcceptfriendComponent;
  let fixture: ComponentFixture<AcceptfriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptfriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
