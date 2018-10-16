import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterthegroupComponent } from './enterthegroup.component';

describe('EnterthegroupComponent', () => {
  let component: EnterthegroupComponent;
  let fixture: ComponentFixture<EnterthegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterthegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterthegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
