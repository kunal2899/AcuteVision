import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAttendanceSComponent } from './check-attendance-s.component';

describe('CheckAttendanceSComponent', () => {
  let component: CheckAttendanceSComponent;
  let fixture: ComponentFixture<CheckAttendanceSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAttendanceSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAttendanceSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
