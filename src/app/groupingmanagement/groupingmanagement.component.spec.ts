import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingmanagementComponent } from './groupingmanagement.component';

describe('GroupingmanagementComponent', () => {
  let component: GroupingmanagementComponent;
  let fixture: ComponentFixture<GroupingmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupingmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupingmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
