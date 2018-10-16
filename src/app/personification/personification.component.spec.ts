import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonificationComponent } from './personification.component';

describe('PersonificationComponent', () => {
  let component: PersonificationComponent;
  let fixture: ComponentFixture<PersonificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
