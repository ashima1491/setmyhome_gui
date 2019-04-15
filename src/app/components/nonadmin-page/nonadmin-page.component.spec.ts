import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonadminPageComponent } from './nonadmin-page.component';

describe('NonadminPageComponent', () => {
  let component: NonadminPageComponent;
  let fixture: ComponentFixture<NonadminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonadminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonadminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
