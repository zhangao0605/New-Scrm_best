import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialmanagementComponent } from './socialmanagement.component';

describe('SocialmanagementComponent', () => {
  let component: SocialmanagementComponent;
  let fixture: ComponentFixture<SocialmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
