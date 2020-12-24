import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAttendanceComponent } from './modify-attendance.component';

describe('ModifyAttendanceComponent', () => {
  let component: ModifyAttendanceComponent;
  let fixture: ComponentFixture<ModifyAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
