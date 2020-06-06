import { Component } from '@angular/core';
import { TaskListService } from '../_services/task-list.service';
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Task } from '../_models/task';

@Component({
	selector: 'app-tasks-list',
	templateUrl: './tasks-list.component.html',
	styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
	constructor(public taskListService: TaskListService) {}

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
}
