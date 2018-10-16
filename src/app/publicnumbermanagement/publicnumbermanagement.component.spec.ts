import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicnumbermanagementComponent } from './publicnumbermanagement.component';

describe('PublicnumbermanagementComponent', () => {
  let component: PublicnumbermanagementComponent;
  let fixture: ComponentFixture<PublicnumbermanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicnumbermanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicnumbermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
