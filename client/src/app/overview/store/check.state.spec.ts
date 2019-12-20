import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CheckState, CheckStateModel } from './check.state';
import { CheckAction } from './check.actions';

describe('Check store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CheckState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: CheckStateModel = {
      items: ['item-1']
    };
    store.dispatch(new CheckAction('item-1'));
    const actual = store.selectSnapshot(CheckState.getState);
    expect(actual).toEqual(expected);
  });

});
