import { Action, Selector, State, StateContext } from '@ngxs/store';

import { TeacherOverview } from '../models/teacher-overview';
import { OverviewService } from '../services/overview.service';
import { LoadTeacherOverview } from './overview-state.actions';

export interface OverviewStateModel {
  teachers: TeacherOverview[];
}

export const defaultOverviewState = {
    teachers: []
};

@State<OverviewStateModel>({
  name: 'overviewState',
  defaults: defaultOverviewState
})

export class OverviewState {

  constructor(private overviewService: OverviewService) {

  }

  @Selector()
  public static teachers(state: OverviewStateModel) {
    return state.teachers;
  }

  @Action(LoadTeacherOverview)
  public loadOverview(ctx: StateContext<OverviewStateModel>, { }: LoadTeacherOverview) {
    const state = ctx.getState();
    this.overviewService.getTeacherOverview()
      .subscribe(data => {
        ctx.patchState({teachers: data});
      });
  }
}
