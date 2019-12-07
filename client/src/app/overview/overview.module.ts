import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { OverviewService } from './services/overview.service';
import { OverviewState } from './store/overview-state.state';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    NgxsModule.forFeature([OverviewState])
  ],
  providers: [
    OverviewService
  ]
})
export class OverviewModule { }
