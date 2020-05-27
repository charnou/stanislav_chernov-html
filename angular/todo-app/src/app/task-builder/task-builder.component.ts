import { Component, OnInit } from '@angular/core';
import { Task } from '../_services/task-list-data.service';
import { TaskListService } from '../_services/task-list.service';

@Component({
  selector: 'app-task-builder',
  templateUrl: './task-builder.component.html',
  styleUrls: ['./task-builder.component.scss'],
})
export class TaskBuilderComponent implements OnInit {
  // Task{}
  public task: Task;

  // FIELDS FOR Task{}
  public title: string;
  public description: string;
  public time: Date;

  constructor(public taskListService: TaskListService) {
    this.title = '';
    this.description = '';
    this.time = new Date();
  }

  // CLOCK TIME UPDATING
  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  public canClear(): boolean {
    return this.title.length !== 0 || this.description.length !== 0;
  }

  // REMOVE TEXT FOR INPUTS
  public clearInput(): void {
    this.title = '';
    this.description = '';
  }

  // CREATE A Task{} WITH FIELDS
  public buildTask(): void {
    if (this.title.length === 0) {
      return;
    }

    const title = this.title;
    const description = this.description;
    const timeLog: Date = this.time;

    this.title = '';
    this.description = '';

    this.task = { title, description, timeLog };
  }

  // PUSH Task{} INTO PARENT
  public addTask(): void {
    this.taskListService.addTask(this.task);
  }
}
