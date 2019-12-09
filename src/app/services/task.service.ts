import { Injectable, EventEmitter } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Task } from '../models';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { Platform } from '@ionic/angular';
import { TaskRepresentation } from '../models/taskRepresentation';

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
      });
  }

  add(task: Task): Promise<any> {
    const taskRepresentation = new TaskRepresentation(task);
    return this.db.post(taskRepresentation);
  }

  update(task: Task): Promise<any> {
    return this.db.put(task);
  }

  delete(task: Task): Promise<any> {
    return this.db.remove(task);
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
}

// export const tasks: Task[] = [
//   new Task(1, 'E-Mail beantworten', undefined, '3d verbleibend', 0, 3, true, true, true, true, ['Etikett 1', 'Etikett 2']),
//   new Task(2, 'Empfänger angeben', undefined, undefined, 1, 0, false, false, false, false, undefined),
//   new Task(3, 'Betreff angeben', undefined, undefined, 1, 0, false, false, false, false, undefined),
//   new Task(4, 'Text schreiben', undefined, undefined, 1, 0, false, false, false, true, undefined),
//   new Task(5, 'Begrüßung', undefined, undefined, 2, 0, false, false, false, false, undefined),
//   new Task(6, 'Haupteil', undefined, undefined, 2, 0, false, false, false, false, undefined),
//   new Task(7, 'Verabschiedung', undefined, undefined, 2, 0, false, false, false, false, undefined),
//   new Task(8, 'Versenden', undefined, undefined, 2, 0, false, false, false, false, undefined),
//   new Task(9, 'Papierkorb leeren', undefined, undefined, 0, 0, false, false, false, false, undefined)
// ];
