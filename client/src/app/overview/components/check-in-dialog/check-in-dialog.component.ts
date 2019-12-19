import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Unit } from '../../models/unit';

@Component({
  selector: 'app-check-in-dialog',
  templateUrl: './check-in-dialog.component.html',
  styleUrls: ['./check-in-dialog.component.scss']
})
export class CheckInDialogComponent implements OnInit {
  @Output() save = new EventEmitter<Unit>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<CheckInDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unit
  ) { }

  ngOnInit() {
  }

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
