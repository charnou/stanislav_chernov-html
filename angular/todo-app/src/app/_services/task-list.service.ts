import { Injectable, OnDestroy } from '@angular/core';
import {
	TaskListDataService,
	TaskListSettings,
} from './task-list-data.service';

import { takeUntil, delay } from 'rxjs/operators';
import { Subject, forkJoin, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

import { Task } from '../_models/task.model';

@Injectable({
	providedIn: 'root',
})
export class TaskListService implements OnDestroy {
	private desctroySubject$: Subject<boolean> = new Subject<boolean>();

	public taskList: Task[] = [];
	public taskListCompleted: Task[] = [];

	public TaskList$: ReplaySubject<Task[]> = new ReplaySubject<Task[]>(1);

	public settings: any = null;

	public arraySortToggle: boolean;

	public searchString: string = '';

	public isLoading: boolean = true;

	// tslint:disable-next-line: variable-name
	constructor(
		private _taskListDataService: TaskListDataService,
		private _router: Router
	) {
		forkJoin([
			this._taskListDataService
				.loadTaskList()
				// tslint:disable-next-line: no-magic-numbers
				.pipe(delay(700), takeUntil(this.desctroySubject$)),
			this._taskListDataService
				.loadSettings()
				.pipe(takeUntil(this.desctroySubject$)),
		]).subscribe(([taskList, settings]: [Task[], TaskListSettings]) => {
			this.initTaskList(taskList);
			this.settings = settings;
			this.isLoading = false;
		});
	}

	// FORMATING A TASK LIST ON INIT
	private initTaskList(taskList: Task[]): void {
		this.taskList = taskList;

		// walking through the array in reverse, we avoid the issue
		// caused by removing array's items while iterating it.
		for (let i: number = this.taskList.length - 1; i >= 0; --i) {
			if (Boolean(this.taskList[i].isCompleted)) {
				this.taskListCompleted.unshift(this.taskList[i]);
				this.taskList.splice(i, 1);
			}
		}

		this.TaskList$.next(this.taskList);
	}

	public ngOnDestroy(): void {
		this.desctroySubject$.next(true);
		this.desctroySubject$.complete();
	}

	// ADD TASK INTO taskList[]
	public addTask($event: Task): void {
		this.taskList.unshift($event);
	}

	// DELETE TASK FROM taskList[]
	public deleteTask($event: Task): void {
		this.taskList.forEach((task: Task, i: number) => {
			if ($event.timeLog === task.timeLog) {
				this.taskList.splice(i, 1);
			}
		});
	}

	// MOVE TASK FROM taskList[] INTO taskListCompleted[]
	public completeTask($event: Task): void {
		this.taskList.forEach((task: Task, i: number) => {
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
		this.taskList.forEach((task: Task) => {
			if (task.isCompleted === true) {
				task.isCompleted = false;
			}
		});
		this.taskListCompleted.forEach((task: Task) => {
			if (task.isCompleted === false) {
				task.isCompleted = true;
			}
		});
	}

	// SORT taskList[]
	public sort(): void {
		this.taskList.sort((a: Task, b: Task) => {
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
		const saveTaskList: Task[] = this.taskList.concat(
			this.taskListCompleted
		);
		this._taskListDataService.saveTaskList(saveTaskList);
	}

	public goToTaskDetails(id: number): void {
		this._router.navigate(['/tasks', id + 1]);
	}

	public quitFromTaskDetails(): void {
		this._router.navigate(['/tasks']);
	}
}
