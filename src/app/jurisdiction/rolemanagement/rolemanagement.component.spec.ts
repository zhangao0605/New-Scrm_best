import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemanagementComponent } from './rolemanagement.component';

describe('RolemanagementComponent', () => {
  let component: RolemanagementComponent;
  let fixture: ComponentFixture<RolemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
