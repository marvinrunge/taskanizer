export class TaskRepresentation {
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

    constructor(
    $id: string, $title: string, $details: string, $duration: string, $level: number, $priority: number,
    $reminder: boolean, $repeat: boolean, $attachment: boolean, $mainTask: boolean, $tags: string[]) {
        this._id = $id;
        this.title = $title;
        this.details = $details;
        this.priority = $priority;
        this.duration = $duration;
        this.reminder = $reminder;
        this.repeat = $repeat;
        this.attachment = $attachment;
        this.level = $level;
        this.mainTask = $mainTask;
        this.tags = $tags;
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
