import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TencentnewsComponent } from './tencentnews.component';

describe('TencentnewsComponent', () => {
  let component: TencentnewsComponent;
  let fixture: ComponentFixture<TencentnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TencentnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TencentnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
