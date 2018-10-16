import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketstatisticsComponent } from './marketstatistics.component';

describe('MarketstatisticsComponent', () => {
  let component: MarketstatisticsComponent;
  let fixture: ComponentFixture<MarketstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
