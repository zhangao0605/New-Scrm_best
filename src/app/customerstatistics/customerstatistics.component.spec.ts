import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerstatisticsComponent } from './customerstatistics.component';

describe('CustomerstatisticsComponent', () => {
  let component: CustomerstatisticsComponent;
  let fixture: ComponentFixture<CustomerstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
