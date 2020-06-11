import { Injectable } from '@angular/core';

import { TasksFacade } from '../store/tasks';

@Injectable({
	providedIn: 'root',
})
export class TaskListService {
	public arraySortToggle: boolean = false;

	public searchString: string = '';

	// tslint:disable-next-line: variable-name
	constructor(public tasksFacade: TasksFacade) {}

	// SORT taskList[]
	public sort(): void {
		this.tasksFacade.sortTasks(this.arraySortToggle);
		this.arraySortToggle = !this.arraySortToggle;
	}
}
