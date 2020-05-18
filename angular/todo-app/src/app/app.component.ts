import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface Task {
  title: string;
  description: string;
  timeLog: Date;
  isTaskCompleted: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // [] OF UPCOMING AND COMPLETED TASKS
  public taskList: Task[] = [];
  public taskListCompleted: Task[] = [];

  // VAR FOR CLOCK
  public time = new Date();

  // VAR FOR SORTING
  public arraySortToggle = false;

  // VAR FOR SEARCHING
  public searchString = '';
  public searchResult;

  // ADD TASK INTO taskList[]
  public addTask($event): void {
    this.taskList.unshift($event);

    this.updateTasks();
  }

  // DELETE TASK FROM taskList[]
  public deleteTask($event): void {
    this.taskList.forEach((task, i) => {
      if ($event === task) {
        this.taskList.splice(i, 1);
      }
    });

    this.updateTasks();
  }
  ngOnInit() {
    this.updateTasks();
  }

  // MOVE TASK FROM taskList[] INTO taskListCompleted[]
  public markTaskAsDone($event) {
    this.taskList.forEach((task, i) => {
      if ($event === task) {
        task.isTaskCompleted = true;
        this.taskListCompleted.unshift(task);
        this.taskList.splice(i, 1);
      }
    });

    this.updateTasks();
  }

  // SORT taskList[]
  public sort(): void {
    this.taskList.sort((a, b) => {
      if (this.arraySortToggle) {
        return a.timeLog < b.timeLog ? 1 : -1;
      } else {
        return a.timeLog > b.timeLog ? 1 : -1;
      }
    });
    this.arraySortToggle = !this.arraySortToggle;

    this.updateTasks();
  }

  // SEARCH IN taskList[]
  public search(): void {
    if (this.searchString) {
      this.searchResult = this.taskList.filter((task: Task) => {
        return String(task.title)
          .toLocaleLowerCase()
          .includes(String(this.searchString).toLocaleLowerCase());
      });
    } else {
      this.searchResult = [...this.taskList];
    }
  }

  // UPDATING searchResult[] BY USING search()
  private updateTasks() {
    this.search();
  }

  // DRAG N DROP FUNCTION
  public drop(event: CdkDragDrop<Task>) {
    moveItemInArray(this.searchResult, event.previousIndex, event.currentIndex);
  }
}
