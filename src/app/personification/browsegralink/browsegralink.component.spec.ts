import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsegralinkComponent } from './browsegralink.component';

describe('BrowsegralinkComponent', () => {
  let component: BrowsegralinkComponent;
  let fixture: ComponentFixture<BrowsegralinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsegralinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsegralinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
