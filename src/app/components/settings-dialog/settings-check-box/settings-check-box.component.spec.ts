import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCheckBoxComponent } from './settings-check-box.component';

describe('SettingsCheckBoxComponent', () => {
  let component: SettingsCheckBoxComponent;
  let fixture: ComponentFixture<SettingsCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
