import { Component, ViewChild } from '@angular/core';
import { Task } from 'src/app/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TaskSelectors, TaskActions } from 'src/app/root-store';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['lists.page.scss']
})
export class ListsPage {
  tasks$: Observable<Task[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

  top = 'calc(100% - 4.5rem)';
  overflowY = 'hidden';

  constructor(private store$: Store<RootStoreState.State>) {
    this.tasks$ = this.store$.pipe(
      select(TaskSelectors.selectAllTasks)
    );

    this.error$ = this.store$.pipe(
      select(TaskSelectors.selectTaskError)
    );

    this.isLoading$ = this.store$.pipe(
      select(TaskSelectors.selectTaskIsLoading)
    );
  }

  onSwipeUp() {
    this.top = '3.5rem';
    this.overflowY = 'auto';
  }

  onSwipeDown() {
    this.top = 'calc(100% - 4.5rem)';
    this.overflowY = 'hidden';
  }

  toggle(state: boolean) {
    state ? this.onSwipeDown() : this.onSwipeUp();
  }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }
}

