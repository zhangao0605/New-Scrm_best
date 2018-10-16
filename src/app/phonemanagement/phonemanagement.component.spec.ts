import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonemanagementComponent } from './phonemanagement.component';

describe('PhonemanagementComponent', () => {
  let component: PhonemanagementComponent;
  let fixture: ComponentFixture<PhonemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
