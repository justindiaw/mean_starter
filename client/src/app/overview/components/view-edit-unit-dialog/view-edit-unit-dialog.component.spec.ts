import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditUnitDialogComponent } from './view-edit-unit-dialog.component';

describe('ViewEditTeacherDialogComponent', () => {
  let component: ViewEditUnitDialogComponent;
  let fixture: ComponentFixture<ViewEditUnitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditUnitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
