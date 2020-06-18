import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as TasksActions from './tasks.actions';
import { TypedAction } from '@ngrx/store/src/models';
import { Task } from 'src/app/_models/task.model';
import { TaskListDataService } from '../../_services/task-list-data.service';

@Injectable()
export class TasksEffects {
	public LoadTasks$: Observable<Action> = createEffect(() =>
		this.action$.pipe(
			ofType(TasksActions.loadTasks),
			mergeMap((action: object & TypedAction<string>) =>
				this.taskListDataService.loadTaskList().pipe(
					map((data: Task[]) => {
						return TasksActions.loadCompleted({
							taskList: data,
						});
					}),
					catchError((error: Error) => {
						return of(TasksActions.loadError(error));
					})
				)
			)
		)
	);

	public checkArrays$: Observable<Action> = createEffect(() =>
		this.action$.pipe(
			ofType(
				TasksActions.completeTask ||
					TasksActions.loadTasks ||
					TasksActions.deleteTask ||
					TasksActions.unCompleteTask
			),
			mergeMap((action: object & TypedAction<string>) => {
				return of(TasksActions.checkArrays({}));
			})
		)
	);

	constructor(
		private action$: Actions,
		private taskListDataService: TaskListDataService
	) {}
}
