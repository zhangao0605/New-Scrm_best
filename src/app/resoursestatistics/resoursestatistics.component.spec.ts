import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResoursestatisticsComponent } from './resoursestatistics.component';

describe('ResoursestatisticsComponent', () => {
  let component: ResoursestatisticsComponent;
  let fixture: ComponentFixture<ResoursestatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResoursestatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResoursestatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
