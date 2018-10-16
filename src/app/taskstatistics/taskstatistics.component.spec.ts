import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskstatisticsComponent } from './taskstatistics.component';

describe('TaskstatisticsComponent', () => {
  let component: TaskstatisticsComponent;
  let fixture: ComponentFixture<TaskstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
