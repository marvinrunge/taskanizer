import { Task } from '.';
import * as moment from 'moment';

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
    tags: string[];
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
        this.tags = task.tags;
        this._deleted = false;
    }
}
