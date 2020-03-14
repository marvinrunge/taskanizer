import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Task } from '../models';
import PouchDBAuthentication from 'pouchdb-authentication';
import PouchDB from 'pouchdb';
import { TaskRepresentation } from '../models/taskRepresentation';
import { Router } from '@angular/router';

PouchDB.plugin(PouchDBAuthentication);

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private local;
  private db;

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
    console.log('init db');
    const currentUser = localStorage.getItem('current-user');
    this.local = new PouchDB(currentUser, { auto_compaction: true });
    this.db = new PouchDB('http://localhost:5984/userdb-' + this.ascii_to_hexa(currentUser), {
      fetch(url, opts) {
        opts.credentials = 'include';
        return PouchDB.fetch(url, opts);
      }
    });
    this.local.sync(this.db, {live: true, retry: true}).on('error', console.log.bind(console));
  }

  addUpdateMultipleDocs(tasks: Task[]) {
    const taskRepresentations: TaskRepresentation[] = tasks.map(task => {
       return new TaskRepresentation(task);
    });
    return this.local.bulkDocs(taskRepresentations);
  }

  add(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.local.post(taskRepresentation);
  }

  update(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.local.put(taskRepresentation);
  }

  delete(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.local.remove(taskRepresentation);
  }

  getAll(): Observable<any> {
    return new Observable(observer => {
      this.local.allDocs({ include_docs: true })
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

  getChanges(): Observable<any> {
    return new Observable(observer => {
      // Listen for changes on the database.
      this.local.changes({ live: true, since: 'now', include_docs: true })
        .on('change', change => {
          // Convert string to date, doesn't happen automatically.
          // change.doc.Date = new Date(change.doc.Date);
          observer.next(change);
        });
    });
  }

  getDb() {
    return this.db;
  }

  reset() {
    this.db = undefined;
    this.local = undefined;
  }

}
