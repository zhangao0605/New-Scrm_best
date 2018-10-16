import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystembulletinComponent } from './systembulletin.component';

describe('SystembulletinComponent', () => {
  let component: SystembulletinComponent;
  let fixture: ComponentFixture<SystembulletinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystembulletinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystembulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
