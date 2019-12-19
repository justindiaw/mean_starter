import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';

import { RoleService } from '../services/role.service';
import { CheckInDialogComponent } from './components/check-in-dialog/check-in-dialog.component';
import { CheckInDialogModule } from './components/check-in-dialog/check-in-dialog.module';
import { ViewEditUnitDialogComponent } from './components/view-edit-unit-dialog/view-edit-unit-dialog.component';
import { ViewEditUnitDialogModule } from './components/view-edit-unit-dialog/view-edit-unit-dialog.module';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { OverviewService } from './services/overview.service';
import { OverviewState } from './store/overview-state.state';

const materials = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule
];

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    ViewEditUnitDialogModule,
    CheckInDialogModule,
    NgxsModule.forFeature([OverviewState]),
    ...materials
  ],
  providers: [
    OverviewService,
    RoleService
  ],
  entryComponents: [
    ViewEditUnitDialogComponent,
    CheckInDialogComponent
  ]
})
export class OverviewModule { }
