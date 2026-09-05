import * as moment from 'moment';

export class Task {
    title = '';
    details?: string;
    deadline?: moment.Moment;
    index = 0;
    isDone = false;
    _id?: string;

    constructor(task?: Partial<Task> & { deadline?: moment.Moment | string }) {
        if (task) {
            this._id = task._id;
            this.title = task.title ?? '';
            this.details = task.details;
            this.deadline = task.deadline ? moment(task.deadline) : undefined;
            this.index = task.index ?? 0;
            this.isDone = task.isDone ?? false;
        }
    }
}
