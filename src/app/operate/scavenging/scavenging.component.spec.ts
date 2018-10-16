import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScavengingComponent } from './scavenging.component';

describe('ScavengingComponent', () => {
  let component: ScavengingComponent;
  let fixture: ComponentFixture<ScavengingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScavengingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScavengingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
