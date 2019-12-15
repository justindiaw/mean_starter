import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import { ViewEditUnitDialogComponent } from './view-edit-unit-dialog.component';

const materials = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  declarations: [ViewEditUnitDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...materials
  ]
})
export class ViewEditUnitDialogModule { }
