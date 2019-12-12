import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';

import { TeacherOverview } from './models/teacher-overview';
import { AddTeacher, DeleteTeacher, LoadTeacherOverview, UpdateTeacher } from './store/overview-state.actions';
import { OverviewState } from './store/overview-state.state';
import { ViewEditTeacherDialogComponent } from './view-edit-teacher-dialog/view-edit-teacher-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Select(OverviewState.teachers) teachers$: TeacherOverview[];

  constructor(
    public dialogRef: MatDialog,
    private store: Store,
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.store.dispatch(new LoadTeacherOverview());
  }

  onClickViewEdit(teacher?: TeacherOverview): void {
    const dialog = this.dialogRef.open(ViewEditTeacherDialogComponent, {
      width: '600px',
      data: teacher ? teacher : null
    });

    dialog.componentInstance.cancel.subscribe(() => dialog.close());
    dialog.componentInstance.save.subscribe(teacherData => {
      if (!!teacher) {
        this.store.dispatch(new UpdateTeacher(teacherData));
      } else {
        this.store.dispatch(new AddTeacher(teacherData));
      }
      dialog.close();
    });
  }

  onClickDelete(teacher: TeacherOverview): void {
    this.store.dispatch(new DeleteTeacher(teacher));
  }
}
