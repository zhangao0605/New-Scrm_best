import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreadmessageComponent } from './unreadmessage.component';

describe('UnreadmessageComponent', () => {
  let component: UnreadmessageComponent;
  let fixture: ComponentFixture<UnreadmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnreadmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreadmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
