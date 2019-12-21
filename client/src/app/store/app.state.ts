import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role } from '../model/role';
import { SnackBarMessage } from '../model/snack-bar-message';
import { RoleService } from '../services/role.service';
import { GetRoles, OpenSnackBar } from './app.actions';

export interface AppStateModel {
  roles: Role[];
  roleMap: any;
  snackBarMessage: SnackBarMessage;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    roles: [],
    roleMap: {},
    snackBarMessage: null
  }
})
export class AppState {

  constructor(private roleService: RoleService) { }

  @Selector()
  static roles(state: AppStateModel): Role[] {
    return state.roles;
  }

  @Selector()
  static roleMap(state: AppStateModel): any {
    return state.roleMap;
  }

  @Selector()
  static snackBarMessage(state: AppStateModel): SnackBarMessage {
    return state.snackBarMessage;
  }

  @Action(GetRoles)
  getRoles(ctx: StateContext<AppStateModel>, { }: GetRoles): Observable<void> {
    return this.roleService.getRoles()
      .pipe(map(roles => {
        ctx.patchState({ roles: roles, roleMap: this.getRoleMap(roles) });
      }));
  }

  @Action(OpenSnackBar)
  openSnackBar(ctx: StateContext<AppStateModel>, { message }: OpenSnackBar): void {
    ctx.patchState({ snackBarMessage: message });
  }

  private getRoleMap(roles: Role[]): any {
    const roleMap = {};

    roles.forEach(role => {
      roleMap[role._id] = role.name;
    });

    return roleMap;
  }
}
