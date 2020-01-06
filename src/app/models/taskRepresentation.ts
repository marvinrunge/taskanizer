import { Task } from '.';
import * as moment from 'moment';
import { NumberSymbol } from '@angular/common';

export class TaskRepresentation {
    title: string;
    details: string;
    deadline: string;
    level: number;
    priority: number;
    reminder: boolean;
    repeat: boolean;
    attachment: boolean;
    mainTask: boolean;
    index: number;
    tags: string[];
    isDone: boolean;
    _id: string;
    _deleted: boolean;
    _rev: string;

    constructor(task: Task) {
        this._id = task._id;
        this._rev = task._rev;
        this.title = task.title;
        this.details = task.details;
        this.priority = task.priority;
        this.deadline = task.deadline ? moment.utc(task.deadline).format() : undefined;
        this.reminder = task.reminder;
        this.repeat = task.repeat;
        this.attachment = task.attachment;
        this.level = task.level;
        this.mainTask = task.mainTask;
        this.index = task.index;
        this.tags = task.tags;
        this.isDone = task.isDone;
        this._deleted = false;
    }
}
