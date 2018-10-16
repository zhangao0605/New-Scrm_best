import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeemaillistComponent } from './seemaillist.component';

describe('SeemaillistComponent', () => {
  let component: SeemaillistComponent;
  let fixture: ComponentFixture<SeemaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeemaillistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeemaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
