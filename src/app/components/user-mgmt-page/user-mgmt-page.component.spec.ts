import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMgmtPageComponent } from './user-mgmt-page.component';

describe('UserMgmtPageComponent', () => {
  let component: UserMgmtPageComponent;
  let fixture: ComponentFixture<UserMgmtPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMgmtPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMgmtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
