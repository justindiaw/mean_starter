import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { OverviewStateState, OverviewStateStateModel } from './overview-state.state';
import { OverviewStateAction } from './overview-state.actions';

describe('OverviewState store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([OverviewStateState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: OverviewStateStateModel = {
      items: ['item-1']
    };
    store.dispatch(new OverviewStateAction('item-1'));
    const actual = store.selectSnapshot(OverviewStateState.getState);
    expect(actual).toEqual(expected);
  });

});
