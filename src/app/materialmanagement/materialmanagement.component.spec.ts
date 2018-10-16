import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialmanagementComponent } from './materialmanagement.component';

describe('MaterialmanagementComponent', () => {
  let component: MaterialmanagementComponent;
  let fixture: ComponentFixture<MaterialmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
