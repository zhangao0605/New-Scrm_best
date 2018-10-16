import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccurateaddComponent } from './accurateadd.component';

describe('AccurateaddComponent', () => {
  let component: AccurateaddComponent;
  let fixture: ComponentFixture<AccurateaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccurateaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccurateaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
