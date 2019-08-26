import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsettingsComponent } from './mapsettings.component';

describe('MapsettingsComponent', () => {
  let component: MapsettingsComponent;
  let fixture: ComponentFixture<MapsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
