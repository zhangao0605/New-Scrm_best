import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallapkComponent } from './installapk.component';

describe('InstallapkComponent', () => {
  let component: InstallapkComponent;
  let fixture: ComponentFixture<InstallapkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallapkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallapkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
