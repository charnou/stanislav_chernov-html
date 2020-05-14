import { Component } from '@angular/core';

export interface Task {
  title: string | number,
  description: string | number,
  timeLog: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'todo-app';

  taskList: Task[] = [];

  addTaskToArray($event) {
    this.taskList.unshift($event);
  }

  removeTaskFromArray($event): void {
    for (let i = 0; i < this.taskList.length; i++) {
      if ($event === this.taskList[i].timeLog) {
        this.taskList.splice(i, 1);
      }
    }
  }
}