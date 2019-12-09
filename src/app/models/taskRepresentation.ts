import { Task } from '.';
import * as moment from 'moment';

export class TaskRepresentation {
    _id: string;
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

    constructor(task: Task) {
        this._id = task.id;
        this.title = task.title;
        this.details = task.details;
        this.priority = task.priority;
        this.deadline = moment.utc(task.deadline).format();
        this.reminder = task.reminder;
        this.repeat = task.repeat;
        this.attachment = task.attachment;
        this.level = task.level;
        this.mainTask = task.mainTask;
        this.tags = task.tags;
    }
}
