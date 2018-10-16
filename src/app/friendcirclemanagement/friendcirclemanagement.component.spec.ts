import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendcirclemanagementComponent } from './friendcirclemanagement.component';

describe('FriendcirclemanagementComponent', () => {
  let component: FriendcirclemanagementComponent;
  let fixture: ComponentFixture<FriendcirclemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendcirclemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendcirclemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
