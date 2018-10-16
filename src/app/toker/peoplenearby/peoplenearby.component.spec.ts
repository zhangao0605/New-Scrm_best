import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplenearbyComponent } from './peoplenearby.component';

describe('PeoplenearbyComponent', () => {
  let component: PeoplenearbyComponent;
  let fixture: ComponentFixture<PeoplenearbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplenearbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplenearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
