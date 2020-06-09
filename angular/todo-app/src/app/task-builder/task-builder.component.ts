import { Component, OnInit } from '@angular/core';

import { TaskListService } from '../_services/task-list.service';

import { Task } from '../_models/task.model';
import { TasksFacade } from '../store/tasks/tasks.facade';

@Component({
	selector: 'app-task-builder',
	templateUrl: './task-builder.component.html',
	styleUrls: ['./task-builder.component.scss'],
})
export class TaskBuilderComponent implements OnInit {
	// Task{}
	public task: Task;

	// FIELDS FOR Task{}
	public title: string;
	public description: string;
	public time: Date;

	constructor(
		public taskListService: TaskListService,
		public tasksFacade: TasksFacade
	) {
		this.title = '';
		this.description = '';
		this.time = new Date();
	}

	// CLOCK TIME UPDATING
	public ngOnInit(): void {
		const WATCH_INTERVAL: number = 1000;

		setInterval(() => {
			this.time = new Date();
		}, WATCH_INTERVAL);
	}

	public canClear(): boolean {
		return this.title.length !== 0 || this.description.length !== 0;
	}

	// REMOVE TEXT FOR INPUTS
	public clearInput(): void {
		this.title = '';
		this.description = '';
	}

	// CREATE A Task{} WITH FIELDS
	public buildTask(): void {
		if (this.title.length === 0) {
			return;
		}

		const title: string = this.title;
		const description: string = this.description;
		const timeLog: Date = this.time;
		const isCompleted: boolean = false;
		const isEditing: boolean = false;

		this.title = '';
		this.description = '';

		this.task = {
			title,
			description,
			timeLog,
			isCompleted,
			isEditing,
		};
	}

	// PUSH Task{} INTO PARENT
	public addTask(): void {
		this.tasksFacade.addTask(this.task);
	}
}
