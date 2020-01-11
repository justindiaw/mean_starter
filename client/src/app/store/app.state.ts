import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role } from '../model/role';
import { SnackBarMessage } from '../model/snack-bar-message';
import { localTokenName } from '../model/token';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { GetRoles, Login, OpenSnackBar } from './app.actions';

export interface AppStateModel {
  roles: Role[];
  roleMap: any;
  snackBarMessage: SnackBarMessage;
  token: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    roles: [],
    roleMap: {},
    snackBarMessage: null,
    token: ''
  }
})
export class AppState {

  constructor(
    private roleService: RoleService,
    private userService: UserService
  ) { }

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

  @Selector()
  static token(state: AppStateModel): string {
    return state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AppStateModel>, { }: Login): Observable<void> {
    return this.userService.login()
      .pipe(map(data => {
        localStorage.setItem(localTokenName, data.token);
        ctx.patchState({ token: data.token });
      }));
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
