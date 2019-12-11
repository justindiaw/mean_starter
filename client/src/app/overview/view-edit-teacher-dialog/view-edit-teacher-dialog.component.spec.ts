import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditTeacherDialogComponent } from './view-edit-teacher-dialog.component';

describe('ViewEditTeacherDialogComponent', () => {
  let component: ViewEditTeacherDialogComponent;
  let fixture: ComponentFixture<ViewEditTeacherDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditTeacherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
