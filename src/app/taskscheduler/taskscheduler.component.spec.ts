import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskschedulerComponent } from './taskscheduler.component';

describe('TaskschedulerComponent', () => {
  let component: TaskschedulerComponent;
  let fixture: ComponentFixture<TaskschedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskschedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskschedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
