import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-listitem',
  templateUrl: './task-listitem.component.html',
  styleUrls: ['./task-listitem.component.scss'],
})
export class TaskListitemComponent implements OnInit {

  @Input() task: Task;

  constructor() { }

  ngOnInit() {}

}
