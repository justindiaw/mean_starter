import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CheckService } from '../services/check.service';
import { CheckIn, CheckOut } from './check.actions';
import { LoadUnits } from './overview-state.actions';

export interface CheckStateModel {
  items: string[];
}

@State<CheckStateModel>({
  name: 'check',
  defaults: {
    items: []
  }
})
export class CheckState {
  constructor(private checkService: CheckService) { }

  @Selector()
  public static getState(state: CheckStateModel) {
    return state;
  }

  @Action(CheckIn)
  checkIn(ctx: StateContext<CheckStateModel>, { unitId }: CheckIn): Observable<void> {
    this.checkService.getHistoryChecks(unitId).subscribe();
    return this.checkService.checkIn(unitId)
      .pipe(tap(() => ctx.dispatch(new LoadUnits())));
  }

  @Action(CheckOut)
  checkOut(ctx: StateContext<CheckStateModel>, { unitId }: CheckIn): Observable<void> {
    return this.checkService.checkOut(unitId)
      .pipe(tap(() => ctx.dispatch(new LoadUnits())));
  }
}
