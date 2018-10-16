import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktemplateComponent } from './tasktemplate.component';

describe('TasktemplateComponent', () => {
  let component: TasktemplateComponent;
  let fixture: ComponentFixture<TasktemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasktemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasktemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
