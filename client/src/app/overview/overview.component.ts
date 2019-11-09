import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { TeacherOverview } from './models/teacher-overview';
import { LoadTeacherOverview } from './store/overview-state.actions';
import { OverviewState } from './store/overview-state.state';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Select(OverviewState.teachers) teachers$: TeacherOverview[];

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.store.dispatch(new LoadTeacherOverview());
  }
}
