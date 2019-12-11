import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';

import { TeacherOverview } from './models/teacher-overview';
import { LoadTeacherOverview } from './store/overview-state.actions';
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
    dialog.componentInstance.save.subscribe(() => {

    });
  }
}
