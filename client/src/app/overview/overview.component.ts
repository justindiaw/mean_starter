import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';

import { Unit } from './models/unit';
import { AddUnit, DeleteUnit, LoadUnits, UpdateUnit } from './store/overview-state.actions';
import { OverviewState } from './store/overview-state.state';
import { ViewEditUnitDialogComponent } from './view-edit-unit-dialog/view-edit-unit-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Select(OverviewState.units) units$: Unit[];

  constructor(
    public dialogRef: MatDialog,
    private store: Store,
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.store.dispatch(new LoadUnits());
  }

  onClickViewEdit(teacher?: Unit): void {
    const dialog = this.dialogRef.open(ViewEditUnitDialogComponent, {
      width: '600px',
      data: teacher ? teacher : null
    });

    dialog.componentInstance.cancel.subscribe(() => dialog.close());
    dialog.componentInstance.save.subscribe(teacherData => {
      if (!!teacher) {
        this.store.dispatch(new UpdateUnit(teacherData));
      } else {
        this.store.dispatch(new AddUnit(teacherData));
      }
      dialog.close();
    });
  }

  onClickDelete(teacher: Unit): void {
    this.store.dispatch(new DeleteUnit(teacher));
  }
}
