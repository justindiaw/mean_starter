import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role } from '../model/role';
import { RoleService } from '../services/role.service';
import { GetRoles } from './app.actions';

export interface AppStateModel {
  roles: Role[];
  roleMap: any;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    roles: [],
    roleMap: {}
  }
})
export class AppState {

  constructor(private roleService: RoleService) {

  }

  @Selector()
  static roles(state: AppStateModel): Role[] {
    return state.roles;
  }

  @Selector()
  static roleMap(state: AppStateModel): any {
    return state.roleMap;
  }

  @Action(GetRoles)
  getRoles(ctx: StateContext<AppStateModel>, { }: GetRoles): Observable<void> {
    return this.roleService.getRoles()
      .pipe(map(roles => {
        ctx.patchState({ roles: roles, roleMap: this.getRoleMap(roles) });
      }));
  }

  private getRoleMap(roles: Role[]): any {
    const roleMap = {};

    roles.forEach(role => {
      roleMap[role._id] = role.name;
    });

    return roleMap;
  }
}
