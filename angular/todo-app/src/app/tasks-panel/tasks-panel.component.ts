import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../_services/task-list.service';
import { TaskListDataService } from '../_services/task-list-data.service';
import { Observable, combineLatest } from 'rxjs';
import {
	ITasksState,
	selectIsTasksLoading,
	TasksFacade,
	selectTasks,
	selectTasksCompleted,
} from '../store/tasks';
import { Store, select } from '@ngrx/store';
import { Task } from '../_models/task.model';

@Component({
	selector: 'app-tasks-panel',
	templateUrl: './tasks-panel.component.html',
	styleUrls: ['./tasks-panel.component.scss'],
})
export class TasksPanelComponent implements OnInit {
	public tasksIsLoading$: Observable<boolean>;

	public tasksIncoming: Task[];
	public tasksCompleted: Task[];

	constructor(
		public taskListService: TaskListService,
		public taskListDataService: TaskListDataService,
		private store: Store<{ Tasks: ITasksState }>,
		public tasksFacade: TasksFacade
	) {}

	public ngOnInit(): void {
		this.tasksIsLoading$ = this.store.pipe(select(selectIsTasksLoading));

		combineLatest([
			this.store.pipe(select(selectTasks)),
			this.store.pipe(select(selectTasksCompleted)),
		]).subscribe((data: any) => {
			this.tasksIncoming = [...data[0]];
			this.tasksCompleted = [...data[1]];
		});
	}
}
