import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { GetRoles, Login } from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'manage';

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch([
      new GetRoles(),
      new Login()
    ]);
  }
}
