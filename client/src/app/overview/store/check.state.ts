import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CheckService } from '../services/check.service';
import { CheckIn, CheckOut } from './check.actions';

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
  checkIn({ }: StateContext<CheckStateModel>, { unitId }: CheckIn): Observable<void> {
    return this.checkService.checkIn(unitId);
  }

  @Action(CheckOut)
  checkOut({ }: StateContext<CheckStateModel>, { unitId }: CheckIn): Observable<void> {
    return this.checkService.checkOut(unitId);
  }
}
