import { State } from '@ngxs/store';

export interface AppStateModel {
  name: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    name: 'appState'
  }
})
export class AppState {

  // @Selector()
  // public static getState(state: AppStateModel) {
  //   return state;
  // }

  // @Action(AppAction)
  // public add(ctx: StateContext<AppStateModel>, { payload }: AppAction) {
  //   const stateModel = ctx.getState();
  //   stateModel.items = [...stateModel.items, payload];
  //   ctx.setState(stateModel);
  // }
}
