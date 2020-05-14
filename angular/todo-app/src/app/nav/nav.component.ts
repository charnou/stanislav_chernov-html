import { Task } from './../app.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  public title: string;
  public description: string;
  public time: Date;
  
  public task: Task;

  constructor() {
    this.title = '';
    this.description = '';
    this.time = new Date();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  isTitle(): boolean {
    if (this.title.length != 0) {
      return true;
    }
    return false;
  }

  addTask(): void {
    if (this.title.length == 0) {
      return
    }
    if (this.description.length == 0) {
      this.description = 'No description';
    }

    let title: string = this.title;
    let description: string = this.description;
    let timeLog: Date = this.time;

    this.title = '';
    this.description = '';

    this.task = { title, description, timeLog };
  }

  @Output() onTaskAdd = new EventEmitter();

  callParent(): void {
    this.onTaskAdd.emit(this.task);
  }
}