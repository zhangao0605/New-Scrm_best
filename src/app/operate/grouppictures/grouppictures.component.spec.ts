import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouppicturesComponent } from './grouppictures.component';

describe('GrouppicturesComponent', () => {
  let component: GrouppicturesComponent;
  let fixture: ComponentFixture<GrouppicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouppicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouppicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
