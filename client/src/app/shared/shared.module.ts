import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ParseTimePipe } from './pipes/parse-time.pipe';

@NgModule({
  declarations: [ParseTimePipe],
  imports: [
    CommonModule
  ],
  exports: [ParseTimePipe]
})
export class SharedModule { }
