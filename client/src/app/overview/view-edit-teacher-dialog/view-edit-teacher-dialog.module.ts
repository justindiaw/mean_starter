import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { ViewEditTeacherDialogComponent } from './view-edit-teacher-dialog.component';

const materials = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [ViewEditTeacherDialogComponent],
  imports: [
    CommonModule,
    ...materials
  ]
})
export class ViewEditTeacherDialogModule { }
