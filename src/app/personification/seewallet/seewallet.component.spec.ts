import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeewalletComponent } from './seewallet.component';

describe('SeewalletComponent', () => {
  let component: SeewalletComponent;
  let fixture: ComponentFixture<SeewalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeewalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeewalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
