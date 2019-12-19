import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatFormFieldModule } from '@angular/material';

import { CheckInDialogComponent } from './check-in-dialog.component';

const materials = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [CheckInDialogComponent],
  imports: [
    CommonModule,
    ...materials
  ]
})
export class CheckInDialogModule { }
