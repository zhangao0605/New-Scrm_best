import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneaddComponent } from './phoneadd.component';

describe('PhoneaddComponent', () => {
  let component: PhoneaddComponent;
  let fixture: ComponentFixture<PhoneaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
