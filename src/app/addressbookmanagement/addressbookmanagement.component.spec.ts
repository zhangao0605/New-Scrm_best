import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressbookmanagementComponent } from './addressbookmanagement.component';

describe('AddressbookmanagementComponent', () => {
  let component: AddressbookmanagementComponent;
  let fixture: ComponentFixture<AddressbookmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressbookmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressbookmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
