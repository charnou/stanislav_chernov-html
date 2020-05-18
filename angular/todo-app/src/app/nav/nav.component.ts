import { Task } from './../app.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  // FIELDS FOR Task{}
  public title: string;
  public description: string;
  public time: Date;

  // Task{}
  public task: Task;

  constructor() {
    this.title = '';
    this.description = '';
  }

  // EVENT FOR PARENT
  @Output()
  public onTaskAdd = new EventEmitter();

  // TIME UPDATING
  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  // CHECK IS TITLE HAS FILLED
  public isTitleNotEmpty(): boolean {
    return this.title.length !== 0;
  }

  // CHECK IS DESCRIPTION HAS FILLED
  public isDescriptionNotEmpty(): boolean {
    return this.description.length !== 0;
  }

  // REMOVE TEXT FOR INPUTS
  public clearInput(): void {
    this.title = '';
    this.description = '';
  }

  // CREATE AN Task{} WITH FIELDS
  public buildTask(): void {
    if (this.title.length === 0) {
      return;
    }
    if (this.description.length === 0) {
      this.description = 'No description...';
    }

    const title: string = this.title;
    const description: string = this.description;
    const timeLog: Date = this.time;
    const isTaskCompleted = false;

    this.title = '';
    this.description = '';

    this.task = { title, description, timeLog, isTaskCompleted };
  }

  // PUSH Task{} INTO PARENT
  public addTask(): void {
    this.onTaskAdd.emit(this.task);
  }
}
