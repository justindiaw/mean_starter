import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
import { NgxsModule } from '@ngxs/store';

import { RoleService } from '../services/role.service';
import { SharedModule } from '../shared/shared.module';
import { CheckInDialogComponent } from './components/check-in-dialog/check-in-dialog.component';
import { CheckInDialogModule } from './components/check-in-dialog/check-in-dialog.module';
import { ViewEditUnitDialogComponent } from './components/view-edit-unit-dialog/view-edit-unit-dialog.component';
import { ViewEditUnitDialogModule } from './components/view-edit-unit-dialog/view-edit-unit-dialog.module';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { CheckService } from './services/check.service';
import { OverviewService } from './services/overview.service';
import { ReportService } from './services/report.service';
import { CheckState } from './store/check.state';
import { OverviewState } from './store/overview-state.state';

const materials = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatMenuModule
];

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    ViewEditUnitDialogModule,
    CheckInDialogModule,
    NgxsModule.forFeature([OverviewState, CheckState]),
    ...materials,
    SharedModule
  ],
  providers: [
    OverviewService,
    RoleService,
    CheckService,
    ReportService
  ],
  entryComponents: [
    ViewEditUnitDialogComponent,
    CheckInDialogComponent
  ]
})
export class OverviewModule { }
