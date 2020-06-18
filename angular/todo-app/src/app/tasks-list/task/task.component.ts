import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TaskListService } from 'src/app/_services/task-list.service';

import { Task } from 'src/app/_models/task.model';
import { TasksFacade } from 'src/app/store/tasks';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
	// STATES
	public isDeleteHover: boolean;
	public isDoneHover: boolean;

	// INTERMEDIATE INPUTS
	public editingTitle: string;
	public editingDescription: string;

	@Input()
	public task: Task;

	@Input()
	public index: number;

	constructor(
		public taskListService: TaskListService,
		public tasksFacade: TasksFacade
	) {
		this.isDeleteHover = false;
		this.isDoneHover = false;
	}

	// CALL PARENT TO DELETE TASK
	public deleteTask(): void {
		this.tasksFacade.deleteTask(this.task);
	}

	// CALL PARENT TO COMPLETE TASK
	public completeTask(): void {
		this.tasksFacade.completeTask(this.task);
	}

	public unCompleteTask(): void {
		this.tasksFacade.unCompleteTask(this.task);
	}

	// CHANGE STATE TO 'EDITING'
	public editToggle(): void {
		this.tasksFacade.editTask(this.task);
	}

	// SYNC OF Task{} FIELD AND INTERMEDIATE INPUTS
	public syncInputs(): void {
		this.editingTitle = this.task.title;
		this.editingDescription = this.task.description;
	}

	// PUSH CHANGES FROM INTERMEDIATE INPUTS INTO Task{}
	public saveChanges(): void {
		if (
			this.editingTitle !== this.task.title &&
			this.editingDescription !== this.task.description
		) {
			this.tasksFacade.saveChanges({
				title: this.editingTitle,
				description: this.editingDescription,
				timeLog: this.task.timeLog,
			});
		}
	}
}
