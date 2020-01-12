import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, TaskActions } from 'src/app/root-store';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private store$: Store<RootStoreState.State>) {}

  reset() {
    this.store$.dispatch(
      TaskActions.resetRequest()
    );
  }
}
