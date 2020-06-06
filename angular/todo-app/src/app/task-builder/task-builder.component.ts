import { Component, OnInit } from '@angular/core';

import { TaskListService } from '../_services/task-list.service';

import { Task } from '../_models/task';

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

	constructor(public taskListService: TaskListService) {
		this.title = '';
		this.description = '';
		this.time = new Date();
	}

	// CLOCK TIME UPDATING
	public ngOnInit(): void {
		const timeUpdatingInterval: number = 1000;

		setInterval(() => {
			this.time = new Date();
		}, timeUpdatingInterval);
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
		this.taskListService.addTask(this.task);
	}
}
