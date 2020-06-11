import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../_services/task-list.service';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from '../_models/task.model';
import { ITasksState, TasksFacade } from '../store/tasks';
import { selectTasksCompleted } from '../store/tasks/tasks.selectors';
import {
	selectTasks,
	selectIsTasksLoading,
} from '../store/tasks/tasks.selectors';

@Component({
	selector: 'app-tasks-list',
	templateUrl: './tasks-list.component.html',
	styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
	public taskList$: Observable<Task[]>;
	public taskListCompleted$: Observable<Task[]>;
	public tasksIsLoading$: Observable<boolean>;

	constructor(
		public taskListService: TaskListService,
		private store: Store<{ Tasks: ITasksState }>,
		public tasksFacade: TasksFacade
	) {}

	public drop(event: CdkDragDrop<Task[]>): void {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}

	public ngOnInit(): void {
		this.tasksFacade.loadTasks();
		this.taskList$ = this.store.pipe(select(selectTasks));
		this.taskListCompleted$ = this.store.pipe(select(selectTasksCompleted));
		this.tasksIsLoading$ = this.store.pipe(select(selectIsTasksLoading));
	}
}
