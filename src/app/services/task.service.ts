import { Injectable, EventEmitter } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Task } from '../models';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { Platform } from '@ionic/angular';
import { TaskRepresentation } from '../models/taskRepresentation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private db: PouchDB;

  public constructor(private platform: Platform) {
    this.initDB();
  }

  initDB(): Promise<any> {
    return this.platform.ready()
      .then(() => {
        this.db = new PouchDB('tasks');
        // this.db.sync(environment.remoteCouch + 'tasks', { live: true });
      });
  }

  addUpdateMultipleDocs(tasks: Task[]) {
    const taskRepresentations: TaskRepresentation[] = tasks.map(task => {
       return new TaskRepresentation(task);
    });
    return this.db.bulkDocs(taskRepresentations);
  }

  add(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.db.post(taskRepresentation);
  }

  update(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.db.put(taskRepresentation);
  }

  delete(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.db.remove(taskRepresentation);
  }

  getAll(): Observable<Task[]> {
    return from(
      this.initDB().then(() => {
        return this.db.allDocs({ include_docs: true });
      })
      .then(docs => {
        let tasks: Task[] = [];
        tasks = docs.rows.map(row => {
          const taskRepresentation: TaskRepresentation = row.doc;
          const task = new Task(taskRepresentation);
          return task;
        });
        return tasks;
    }));
  }

  getChanges(): Observable<any> {
    return new Observable(observer => {
      // Listen for changes on the database.
      this.db.changes({ live: true, since: 'now', include_docs: true })
        .on('change', change => {
          // Convert string to date, doesn't happen automatically.
          // change.doc.Date = new Date(change.doc.Date);
          observer.next(change);
        });
    });
  }

  reset(): Promise<any> {
    return this.db.destroy().then(() => {
      this.db = new PouchDB('tasks');
    });
  }

}
