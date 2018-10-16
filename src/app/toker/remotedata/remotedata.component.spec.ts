import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotedataComponent } from './remotedata.component';

describe('RemotedataComponent', () => {
  let component: RemotedataComponent;
  let fixture: ComponentFixture<RemotedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemotedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
