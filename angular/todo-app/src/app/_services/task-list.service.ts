import { Injectable, OnDestroy } from '@angular/core';
import {
  Task,
  TaskListDataService,
  TaskListSettings,
} from './task-list-data.service';

import { delay, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskListService implements OnDestroy {
  public taskList: Task[] = [];
  public taskListCompleted: Task[] = [];

  public settings = null;

  public arraySortToggle: boolean;

  public searchString = '';

  public isLoading = true;

  private desctroySubject$: Subject<boolean> = new Subject<boolean>();

  // tslint:disable-next-line: variable-name
  constructor(private _taskListDataService: TaskListDataService) {
    forkJoin([
      this._taskListDataService
        .loadTaskList()
        .pipe(takeUntil(this.desctroySubject$)),
      this._taskListDataService
        .loadSettings()
        .pipe(takeUntil(this.desctroySubject$)),
    ]).subscribe(([taskList, settings]: [Task[], TaskListSettings]) => {
      this.initTaskList(taskList);
      this.settings = settings;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.desctroySubject$.next(true);
    this.desctroySubject$.complete();
  }

  // FORMATING A TASK LIST ON INIT
  private initTaskList(taskList: Task[]): void {
    this.taskList = taskList;

    // walking through the array in reverse, we avoid the issue
    // caused by removing array's items while iterating it.
    for (let i = this.taskList.length - 1; i >= 0; --i) {
      if (this.taskList[i].isCompleted) {
        this.taskListCompleted.unshift(this.taskList[i]);
        this.taskList.splice(i, 1);
      }
    }
  }

  // ADD TASK INTO taskList[]
  public addTask($event: Task): void {
    this.taskList.unshift($event);
  }

  // DELETE TASK FROM taskList[]
  public deleteTask($event: Task): void {
    this.taskList.forEach((task, i) => {
      if ($event.timeLog === task.timeLog) {
        this.taskList.splice(i, 1);
      }
    });
  }

  // MOVE TASK FROM taskList[] INTO taskListCompleted[]
  public completeTask($event: Task): void {
    this.taskList.forEach((task, i) => {
      if ($event.timeLog === task.timeLog) {
        task.isCompleted = true;
        this.taskListCompleted.unshift(task);
        this.taskList.splice(i, 1);
      }
    });
  }

  // CHECKING IS ALL TASKS ARE MARKED AS COMPLETED
  // OR INCOMPLETED AFTER DRAG N DROP ITEM MOVE
  public checkArrays(): void {
    this.taskList.forEach((task) => {
      if (task.isCompleted) {
        delete task.isCompleted;
      }
    });
    this.taskListCompleted.forEach((task) => {
      if (!task.isCompleted) {
        task.isCompleted = true;
      }
    });
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
  }

  // ADD TASKS LIST TO THE LOCAL STORAGE
  public saveTaskList(): void {
    const saveTaskList = this.taskList.concat(this.taskListCompleted);
    this._taskListDataService.saveTaskList(saveTaskList);
  }
}
