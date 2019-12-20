import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';

import { AppState } from '../store/app.state';
import { CheckInDialogComponent } from './components/check-in-dialog/check-in-dialog.component';
import { ViewEditUnitDialogComponent } from './components/view-edit-unit-dialog/view-edit-unit-dialog.component';
import { Unit } from './models/unit';
import { CheckIn, CheckOut } from './store/check.actions';
import { AddUnit, DeleteUnit, LoadUnits, UpdateUnit } from './store/overview-state.actions';
import { OverviewState } from './store/overview-state.state';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Select(OverviewState.units) units$: Unit[];

  get roleMap(): any {
    return this.store.selectSnapshot(AppState.roleMap);
  }

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

  onClickViewEdit(unit?: Unit): void {
    const dialog = this.dialogRef.open(ViewEditUnitDialogComponent, {
      width: '600px',
      data: unit ? unit : null
    });

    dialog.componentInstance.cancel.subscribe(() => dialog.close());
    dialog.componentInstance.save.subscribe(unitData => {
      if (!!unit) {
        this.store.dispatch(new UpdateUnit(unitData));
      } else {
        this.store.dispatch(new AddUnit(unitData));
      }
      dialog.close();
    });
  }

  onClickCheckIn(unit?: Unit): void {
    const dialog = this.dialogRef.open(CheckInDialogComponent, {
      width: '600px',
      data: unit ? unit : null
    });

    dialog.componentInstance.cancel.subscribe(() => dialog.close());
    dialog.componentInstance.save.subscribe(unitData => {
      this.store.dispatch(new CheckIn(unitData._id));
    });
  }

  onClickCheckOut(unit?: Unit): void {
    const dialog = this.dialogRef.open(CheckInDialogComponent, {
      width: '600px',
      data: unit ? unit : null
    });

    dialog.componentInstance.cancel.subscribe(() => dialog.close());
    dialog.componentInstance.save.subscribe(unitData => {
      this.store.dispatch(new CheckOut(unitData._id));
    });
  }

  onClickDelete(teacher: Unit): void {
    this.store.dispatch(new DeleteUnit(teacher));
  }

  getRoleName(unit: Unit): string {
    return this.roleMap[unit.roleId];
  }
}
