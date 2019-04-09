import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDashBoardComponent } from './info-dash-board.component';

describe('InfoDashBoardComponent', () => {
  let component: InfoDashBoardComponent;
  let fixture: ComponentFixture<InfoDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
