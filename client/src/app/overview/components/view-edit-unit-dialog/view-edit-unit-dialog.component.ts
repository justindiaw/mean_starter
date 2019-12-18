import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role';
import { AppState } from 'src/app/store/app.state';

import { Unit } from '../../models/unit';

@Component({
  selector: 'app-view-edit-unit-dialog',
  templateUrl: './view-edit-unit-dialog.component.html',
  styleUrls: ['./view-edit-unit-dialog.component.scss']
})
export class ViewEditUnitDialogComponent implements OnInit {
  @Select(AppState.roles) roles$: Observable<Role[]>;

  @Output() save = new EventEmitter<Unit>();
  @Output() cancel = new EventEmitter<void>();

  unit: Unit;

  constructor(
    public dialogRef: MatDialogRef<ViewEditUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unit
  ) { }

  ngOnInit() {
    this.unit = this.data ? { ...this.data } :
      <Unit>{
        _id: '',
        firstName: '',
        lastName: '',
        roleId: ''
      };
  }

  onSave(): void {
    this.save.emit(this.unit);
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
