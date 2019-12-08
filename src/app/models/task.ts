import { TaskRepresentation } from './taskRepresentation';

export class Task {
    _id: string;
    title: string;
    details: string;
    duration: string;
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
            this._id = taskRepresentation._id;
            this.title = taskRepresentation.title;
            this.details = taskRepresentation.details;
            this.duration = taskRepresentation.duration;
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
        if (this.priority || this.duration || this.reminder ||
            this.repeat || this.attachment || this.tags) {
            return true;
        } else {
            return false;
        }
    }
}
