import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../_services/task-list.service';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Task } from '../_models/task.model';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectTasks } from '../store/tasks/tasks.selectors';

@Component({
	selector: 'app-tasks-list',
	templateUrl: './tasks-list.component.html',
	styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
	public tasks$: Observable<Task[]>;

	constructor(
		public taskListService: TaskListService,
		private store: Store
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
			this.taskListService.checkArrays();
		}
	}

	public ngOnInit(): void {
		this.tasks$ = this.store.pipe(select(selectTasks));
	}
}
