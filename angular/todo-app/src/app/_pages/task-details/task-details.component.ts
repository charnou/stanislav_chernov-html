import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TaskListService } from '../../_services/task-list.service';

import { Task } from 'src/app/_models/task';

@Component({
	selector: 'app-task-details',
	templateUrl: './task-details.component.html',
	styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject<boolean>();

	public currentTask: Task;

	constructor(
		private _activatedRoute: ActivatedRoute,
		// tslint:disable-next-line: no-shadowed-variable
		public TaskListService: TaskListService
	) {}

	public ngOnInit(): void {
		// tslint:disable-next-line: deprecation
		combineLatest(
			this._activatedRoute.params,
			this.TaskListService.TaskList$
		)
			.pipe(takeUntil(this.destroySubject$))
			.subscribe(([params, taskList]: [Params, Task[]]) => {
				// tslint:disable-next-line: radix
				let id: number;

				if (params.id > taskList.length) {
					id = taskList.length - 1;
					// tslint:disable-next-line: use-isnan
				} else if (
					params.id <= 0 ||
					isNaN(params.id) ||
					params.id === 'NaN'
				) {
					id = 0;
				} else {
					// tslint:disable-next-line: radix
					id = parseInt(params.id) - 1;
				}

				this.currentTask = taskList[id];
				this.TaskListService.goToTaskDetails(id);
			});
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
