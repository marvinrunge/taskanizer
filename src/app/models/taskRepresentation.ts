import { Task } from '.';
import * as moment from 'moment';

export class TaskRepresentation {
    title: string;
    details: string;
    deadline: string;
    index: number;
    isDone: boolean;
    // tslint:disable-next-line: variable-name
    _id: string;
    // tslint:disable-next-line: variable-name
    _deleted: boolean;
    // tslint:disable-next-line: variable-name
    _rev: string;

    constructor(task: Task) {
        this._id = task._id;
        this._rev = task._rev;
        this.title = task.title;
        this.details = task.details;
        this.deadline = task.deadline ? moment.utc(task.deadline).format() : undefined;
        this.index = task.index;
        this.isDone = task.isDone;
        this._deleted = false;
    }
}
