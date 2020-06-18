import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Task } from 'src/app/_models/task.model';
import * as TasksActions from './tasks.actions';
import { TaskListDataService } from '../../_services/task-list-data.service';
import { selectTasks, selectTasksCompleted } from './tasks.selectors';
import { combineLatest, Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TasksFacade {
	constructor(
		private store: Store,
		private taskListDataService: TaskListDataService
	) {}

	public loadTasks(): void {
		this.store.dispatch(TasksActions.loadTasks({}));
		this.saveTaskListToLocalStorage();
	}

	public addTask(task: Task): void {
		this.store.dispatch(TasksActions.addTask({ task }));
		this.saveTaskListToLocalStorage();
	}

	public deleteTask(task: Task): void {
		this.store.dispatch(TasksActions.deleteTask({ task }));
		this.saveTaskListToLocalStorage();
	}

	public completeTask(task: Task): void {
		this.store.dispatch(TasksActions.completeTask({ task }));
		this.saveTaskListToLocalStorage();
	}

	public unCompleteTask(task: Task): void {
		this.store.dispatch(TasksActions.unCompleteTask({ task }));
		this.saveTaskListToLocalStorage();
	}

	public editTask(task: Task): void {
		this.store.dispatch(TasksActions.toggleEditTask({ task }));
	}

	public saveChanges({
		title,
		description,
		timeLog,
	}: {
		title: string;
		description: string;
		timeLog: Date;
	}): void {
		this.store.dispatch(
			TasksActions.saveChangesAfterEdit({ title, description, timeLog })
		);
	}

	public sortTasks(sortToggle: boolean): void {
		let sortedArray: Task[];
		const sub: Subscription = this.store
			.pipe(select(selectTasks))
			.subscribe((taskList: Task[]) => {
				sortedArray = [...taskList];
			});

		if (Boolean(sortedArray)) {
			sortedArray.sort((a: Task, b: Task) => {
				if (Boolean(sortToggle)) {
					return a.timeLog < b.timeLog ? 1 : -1;
				} else {
					return a.timeLog > b.timeLog ? 1 : -1;
				}
			});

			this.store.dispatch(TasksActions.sortTasks({ sortedArray }));
		}

		sub.unsubscribe();
	}

	public saveTaskListToLocalStorage(): void {
		combineLatest([
			this.store.pipe(select(selectTasks)),
			this.store.pipe(select(selectTasksCompleted)),
		]).subscribe((data: any) => {
			this.taskListDataService.saveTaskList([...data[0], ...data[1]]);
		});
	}
}
