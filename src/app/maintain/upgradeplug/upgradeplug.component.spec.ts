import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeplugComponent } from './upgradeplug.component';

describe('UpgradeplugComponent', () => {
  let component: UpgradeplugComponent;
  let fixture: ComponentFixture<UpgradeplugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeplugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeplugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
