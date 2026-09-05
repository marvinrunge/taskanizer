import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models';
import { firebaseAuth, firestore } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  getAll(): Observable<Task[]> {
    return new Observable(subscriber => onSnapshot(
      this.tasksCollection(),
      snapshot => subscriber.next(snapshot.docs.map(item =>
        new Task({ ...item.data(), _id: item.id } as Partial<Task>)
      )),
      error => subscriber.error(error)
    ));
  }

  async add(task: Task): Promise<void> {
    await addDoc(this.tasksCollection(), this.toDocument(task));
  }

  async update(task: Task): Promise<void> {
    if (!task._id) {
      throw new Error('Cannot update a task without an id');
    }
    await setDoc(doc(this.tasksCollection(), task._id), this.toDocument(task));
  }

  async delete(task: Task): Promise<void> {
    if (!task._id) {
      throw new Error('Cannot delete a task without an id');
    }
    await deleteDoc(doc(this.tasksCollection(), task._id));
  }

  private tasksCollection() {
    const user = firebaseAuth.currentUser;
    if (!user) {
      throw new Error('A signed-in user is required');
    }
    return collection(firestore, `users/${user.uid}/tasks`);
  }

  private toDocument(task: Task) {
    return {
      title: task.title,
      details: task.details ?? null,
      deadline: task.deadline?.toISOString() ?? null,
      index: task.index,
      isDone: task.isDone
    };
  }
}
