import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelmanagementComponent } from './labelmanagement.component';

describe('LabelmanagementComponent', () => {
  let component: LabelmanagementComponent;
  let fixture: ComponentFixture<LabelmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
