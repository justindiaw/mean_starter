import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TeacherOverview } from '../models/teacher-overview';

@Component({
  selector: 'app-view-edit-teacher-dialog',
  templateUrl: './view-edit-teacher-dialog.component.html',
  styleUrls: ['./view-edit-teacher-dialog.component.scss']
})
export class ViewEditTeacherDialogComponent implements OnInit {
  @Output() save = new EventEmitter<TeacherOverview>();
  @Output() cancel = new EventEmitter<void>();

  teacher: TeacherOverview;

  constructor(
    public dialogRef: MatDialogRef<ViewEditTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeacherOverview
  ) { }

  ngOnInit() {
  }

  onSave(): void {
    this.save.emit(this.teacher);
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
