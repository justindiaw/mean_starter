import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SnackBarComponent } from './snack-bar.component';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [
    CommonModule
  ],
  exports: [SnackBarComponent]
})
export class SnackBarModule { }
