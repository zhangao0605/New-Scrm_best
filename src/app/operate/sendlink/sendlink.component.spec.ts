import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendlinkComponent } from './sendlink.component';

describe('SendlinkComponent', () => {
  let component: SendlinkComponent;
  let fixture: ComponentFixture<SendlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
