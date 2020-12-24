import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAttendanceTComponent } from './check-attendance-t.component';

describe('CheckAttendanceTComponent', () => {
  let component: CheckAttendanceTComponent;
  let fixture: ComponentFixture<CheckAttendanceTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAttendanceTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAttendanceTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
