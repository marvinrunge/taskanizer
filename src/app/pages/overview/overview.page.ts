import { Component, computed, signal, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { IonSearchbar } from '@ionic/angular';
import { TaskStore } from 'src/app/services/task-store.service';

@Component({
  standalone: false,
  selector: 'app-overview',
  templateUrl: 'overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPage {
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  maxDeadline: moment.Moment = moment().add(1, 'd');
  minDeadline: moment.Moment = moment().startOf('day');
  readonly title = signal('relevant');

  readonly showDoneTasks = signal(false);
  readonly searchMode = signal(false);
  readonly searchTerm = signal('');
  readonly searchbarMaxHeight = computed(() => this.searchMode() ? '58px' : '0px');
  readonly tasks = computed(() => {
    if (this.searchMode()) {
      return this.taskStore.byName(this.searchTerm());
    }
    const showDone = this.showDoneTasks();
    switch (this.title()) {
      case 'today':
      case 'week':
      case 'overdue':
        return this.taskStore.byTimeSpan(showDone, this.minDeadline, this.maxDeadline);
      case 'withoutDeadline':
        return this.taskStore.withoutDeadline(showDone);
      case 'all':
        return this.taskStore.orderedByTitle(showDone);
      default:
        return this.taskStore.relevant(showDone);
    }
  });

  constructor(private taskStore: TaskStore) {}

  selectMaxDeadline(deadline: string) {
    if (deadline === 'today') {
      this.title.set('today');
      this.minDeadline = moment().startOf('day');
      this.maxDeadline = moment().endOf('day');
    } else if (deadline === 'week') {
      this.title.set('week');
      this.minDeadline = moment().startOf('day');
      this.maxDeadline = moment().add(7, 'd').endOf('day');
    } else if (deadline === 'overdue') {
      this.title.set('overdue');
      this.minDeadline = moment().subtract(10, 'y').startOf('day');
      this.maxDeadline = moment();
    } else if (deadline === 'withoutDeadline') {
      this.title.set('withoutDeadline');
    } else if (deadline === 'relevant') {
      this.title.set('relevant');
    } else if (deadline === 'all') {
      this.title.set('all');
    }
  }

  toggleSearchMode() {
    this.searchMode.update(value => !value);
    if (!this.searchMode()) {
      this.searchTerm.set('');
    } else {
      this.searchbar.setFocus();
    }
  }

  search(event) {
    if (this.searchMode()) {
      let searchTerm = event.target.value;
      if (searchTerm === '*') {
        searchTerm = '';
      }
      this.searchTerm.set(searchTerm);
    }
  }

  toggleShowDoneTasks() {
    setTimeout(() => {
      this.showDoneTasks.update(value => !value);
    }, 200);
  }
}
