import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonadminDashboardComponent } from './nonadmin-dashboard.component';

describe('NonadminDashboardComponent', () => {
  let component: NonadminDashboardComponent;
  let fixture: ComponentFixture<NonadminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonadminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
