import { Action, Selector, State, StateContext } from '@ngxs/store';

import { TeacherOverview } from '../models/teacher-overview';
import { OverviewService } from '../services/overview.service';
import { AddTeacher, DeleteTeacher, LoadTeacherOverview, UpdateTeacher } from './overview-state.actions';

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
  loadOverview(ctx: StateContext<OverviewStateModel>, { }: LoadTeacherOverview) {
    this.overviewService.getTeacherOverview()
      .subscribe(data => {
        ctx.patchState({ teachers: data });
      });
  }

  @Action(AddTeacher)
  addTeacher(ctx: StateContext<OverviewStateModel>, { teacher }: AddTeacher) {
    this.overviewService.addTeacher(teacher)
      .subscribe(() => {
        ctx.dispatch(new LoadTeacherOverview());
      });
  }

  @Action(DeleteTeacher)
  deleteTeacher(ctx: StateContext<OverviewStateModel>, { teacher }: DeleteTeacher) {
    this.overviewService.deleteTeacher(teacher)
      .subscribe(() => {
        ctx.dispatch(new LoadTeacherOverview());
      });
  }

  @Action(UpdateTeacher)
  updateTeacher(ctx: StateContext<OverviewStateModel>, { teacher }: UpdateTeacher) {
    this.overviewService.updateTeacher(teacher)
      .subscribe(teacherResult => {
        ctx.dispatch(new LoadTeacherOverview());
      });
  }
}
