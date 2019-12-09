import { TaskRepresentation } from './taskRepresentation';
import * as moment from 'moment';

export class Task {
    id: string;
    title: string;
    details: string;
    deadline: moment.Moment;
    level: number;
    priority: number;
    reminder: boolean;
    repeat: boolean;
    attachment: boolean;
    mainTask: boolean;
    tags: string[];

    constructor()
    constructor(taskRepresentation: TaskRepresentation)
    constructor(taskRepresentation?: TaskRepresentation) {
        if (taskRepresentation) {
            this.id = taskRepresentation._id;
            this.title = taskRepresentation.title;
            this.details = taskRepresentation.details;
            this.deadline = moment.utc(taskRepresentation.deadline).local();
            this.level = taskRepresentation.level;
            this.priority = taskRepresentation.priority;
            this.reminder = taskRepresentation.reminder;
            this.repeat = taskRepresentation.repeat;
            this.attachment = taskRepresentation.attachment;
            this.mainTask = taskRepresentation.mainTask;
            this.tags = taskRepresentation.tags;
        }
    }

    hasSubtitle() {
        if (this.priority || this.deadline || this.reminder ||
            this.repeat || this.attachment || this.tags) {
            return true;
        } else {
            return false;
        }
    }
}
