import { Task } from './../app.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  delete: boolean;
  done: boolean;
  completed: boolean;

  @Input() taskList: Task;

  constructor() {
    this.delete = false;
    this.done = false;
    this.completed = false;
  }

  ngOnInit() {
  }

  @Output() onTaskDelete = new EventEmitter();

  callParent(): void {
    this.onTaskDelete.emit(this.taskList.timeLog);
  }
}
