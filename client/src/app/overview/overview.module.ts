import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';

import { RoleService } from '../services/role.service';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { OverviewService } from './services/overview.service';
import { OverviewState } from './store/overview-state.state';
import { ViewEditUnitDialogComponent } from './view-edit-unit-dialog/view-edit-unit-dialog.component';
import { ViewEditUnitDialogModule } from './view-edit-unit-dialog/view-edit-unit-dialog.module';

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
    NgxsModule.forFeature([OverviewState]),
    ...materials
  ],
  providers: [
    OverviewService,
    RoleService
  ],
  entryComponents: [
    ViewEditUnitDialogComponent
  ]
})
export class OverviewModule { }
