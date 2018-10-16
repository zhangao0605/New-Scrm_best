import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialnumbermanagementComponent } from './socialnumbermanagement.component';

describe('SocialnumbermanagementComponent', () => {
  let component: SocialnumbermanagementComponent;
  let fixture: ComponentFixture<SocialnumbermanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialnumbermanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialnumbermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
