import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Unit } from '../models/unit';
import { OverviewService } from '../services/overview.service';
import { AddUnit, DeleteUnit, LoadUnits, UpdateUnit } from './overview-state.actions';

export interface OverviewStateModel {
  units: Unit[];
}

export const defaultOverviewState = {
  units: []
};

@State<OverviewStateModel>({
  name: 'overviewState',
  defaults: defaultOverviewState
})

export class OverviewState {

  constructor(private overviewService: OverviewService) {

  }

  @Selector()
  public static units(state: OverviewStateModel) {
    return state.units;
  }

  @Action(LoadUnits)
  loadUnits(ctx: StateContext<OverviewStateModel>, { }: LoadUnits) {
    this.overviewService.getTeacherOverview()
      .subscribe(data => {
        ctx.patchState({ units: data });
      });
  }

  @Action(AddUnit)
  addUnit(ctx: StateContext<OverviewStateModel>, { unit }: AddUnit) {
    this.overviewService.addTeacher(unit)
      .subscribe(() => {
        ctx.dispatch(new LoadUnits());
      });
  }

  @Action(DeleteUnit)
  deleteUnit(ctx: StateContext<OverviewStateModel>, { unit }: DeleteUnit) {
    this.overviewService.deleteTeacher(unit)
      .subscribe(() => {
        ctx.dispatch(new LoadUnits());
      });
  }

  @Action(UpdateUnit)
  updateUnit(ctx: StateContext<OverviewStateModel>, { unit }: UpdateUnit) {
    this.overviewService.updateTeacher(unit)
      .subscribe(teacherResult => {
        ctx.dispatch(new LoadUnits());
      });
  }
}
