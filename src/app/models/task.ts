import { TaskRepresentation } from './taskRepresentation';
import * as moment from 'moment';

export class Task {
    title: string;
    details: string;
    deadline: moment.Moment;
    index: number;
    isDone: boolean;
    // tslint:disable-next-line: variable-name
    _id: string;
    // tslint:disable-next-line: variable-name
    _rev: string;

    constructor()
    // tslint:disable-next-line: unified-signatures
    constructor(taskRepresentation: TaskRepresentation)
    constructor(taskRepresentation?: TaskRepresentation) {
        if (taskRepresentation) {
            this._id = taskRepresentation._id;
            this._rev = taskRepresentation._rev;
            this.title = taskRepresentation.title;
            this.details = taskRepresentation.details;
            this.deadline = taskRepresentation.deadline ? moment.utc(taskRepresentation.deadline).local() : undefined;
            this.index = taskRepresentation.index;
            this.isDone = taskRepresentation.isDone;
        }
    }
}
