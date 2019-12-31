import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

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
  @Select(OverviewState.units) units$: Observable<Unit[]>;

  get roleMap(): any {
    return this.store.selectSnapshot(AppState.roleMap);
  }

  // get dataSource(): MatTableDataSource<Unit> {
  //   return new MatTableDataSource(this.store.selectSnapshot(OverviewState.units));
  // }

  displayedColumns: string[] = ['name', 'role', 'checkIn', 'checkOut', 'checkInTime', 'viewEdit', 'delete', 'more'];
  dataSource: MatTableDataSource<Unit>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialog,
    private store: Store,
  ) { }

  ngOnInit() {
    this.load();
    this.bindToUnitsChange();
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
      dialog.close();
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
      dialog.close();
    });
  }

  onClickDelete(teacher: Unit): void {
    this.store.dispatch(new DeleteUnit(teacher));
  }

  getRoleName(unit: Unit): string {
    return this.roleMap[unit.role];
  }

  private bindToUnitsChange(): void {
    this.units$.subscribe(() => {
      this.dataSource = new MatTableDataSource(this.store.selectSnapshot(OverviewState.units));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
