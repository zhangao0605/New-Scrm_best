import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralstatisticsComponent } from './generalstatistics.component';

describe('GeneralstatisticsComponent', () => {
  let component: GeneralstatisticsComponent;
  let fixture: ComponentFixture<GeneralstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
