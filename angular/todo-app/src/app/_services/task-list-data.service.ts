import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Task } from '../_models/task.model';

export interface TaskListSettings {
	isSearchActive: boolean;
	isSortActive: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class TaskListDataService {
	private _tasksLoadURL: string = 'assets/task-list.json';
	private _settingsLoadURL: string = 'assets/task-list-settings.json';

	private LSKey: string = 'TUDOO--task-list';

	constructor(private _httpClient: HttpClient) {}

	public loadTaskList(): Observable<Task[]> {
		const LSData: string = localStorage.getItem(this.LSKey);
		if (Boolean(LSData)) {
			return of(JSON.parse(LSData));
		} else {
			return this._httpClient.get<Task[]>(`${this._tasksLoadURL}`);
		}
	}

	public loadSettings(): Observable<TaskListSettings> {
		return this._httpClient.get<TaskListSettings>(
			`${this._settingsLoadURL}`
		);
	}

	public saveTaskList(taskList: Task[]): void {
		localStorage.setItem(this.LSKey, JSON.stringify(taskList));
	}
}
