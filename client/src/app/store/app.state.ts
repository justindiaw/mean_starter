import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role } from '../model/role';
import { RoleService } from '../services/role.service';
import { GetRoles } from './app.actions';

export interface AppStateModel {
  roles: Role[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    roles: []
  }
})
export class AppState {

  constructor(private roleService: RoleService) {

  }

  @Selector()
  static roles(state: AppStateModel): Role[] {
    return state.roles;
  }

  @Action(GetRoles)
  getRoles(ctx: StateContext<AppStateModel>, { }: GetRoles): Observable<void> {
    return this.roleService.getRoles()
      .pipe(map(roles => {
        ctx.patchState({ roles: roles });
      }));
  }
}
