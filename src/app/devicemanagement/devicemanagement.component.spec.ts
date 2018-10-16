import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicemanagementComponent } from './devicemanagement.component';

describe('DevicemanagementComponent', () => {
  let component: DevicemanagementComponent;
  let fixture: ComponentFixture<DevicemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
