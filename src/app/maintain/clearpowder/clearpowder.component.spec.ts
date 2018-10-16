import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearpowderComponent } from './clearpowder.component';

describe('ClearpowderComponent', () => {
  let component: ClearpowderComponent;
  let fixture: ComponentFixture<ClearpowderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearpowderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearpowderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
