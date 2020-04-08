import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models';
import PouchDBAuthentication from 'pouchdb-authentication';
import PouchDB from 'pouchdb';
import { TaskRepresentation } from '../models/taskRepresentation';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

PouchDB.plugin(PouchDBAuthentication);

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localDb;
  private remoteDb;

  public constructor(public router: Router) {
  }

  ascii_to_hexa(str) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n ++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  initDb() {
    const currentUser = localStorage.getItem('current-user');
    this.localDb = new PouchDB(currentUser, { auto_compaction: true });
    this.remoteDb = new PouchDB(environment.remoteCouch + 'userdb-'
      + this.ascii_to_hexa(currentUser), { skip_setup: true });
    this.localDb.sync(this.remoteDb, {live: true, retry: true});
  }

  addUpdateMultipleDocs(tasks: Task[]) {
    const taskRepresentations: TaskRepresentation[] = tasks.map(task => {
       return new TaskRepresentation(task);
    });
    return this.localDb.bulkDocs(taskRepresentations);
  }

  add(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.localDb.post(taskRepresentation);
  }

  update(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.localDb.put(taskRepresentation);
  }

  delete(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.localDb.remove(taskRepresentation);
  }

  getAll(): Observable<any> {
    return new Observable(observer => {
      this.localDb.allDocs({ include_docs: true })
      .then(docs => {
        let tasks: Task[] = [];
        tasks = docs.rows.map(row => {
          const taskRepresentation: TaskRepresentation = row.doc;
          const task = new Task(taskRepresentation);
          return task;
        });
        observer.next(tasks);
        observer.complete();
      });
    });
  }

  getChanges(): Observable<TaskRepresentation> {
    return new Observable(observer => {
      this.localDb.changes({ live: true, since: 'now', include_docs: true })
        .on('change', change => {
          observer.next(change.doc);
        });
    });
  }

  getDb() {
    return this.remoteDb;
  }

  reset() {
    this.remoteDb = undefined;
    this.localDb = undefined;
  }

}
