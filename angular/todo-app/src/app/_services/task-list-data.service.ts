import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

export interface Task {
  title: string;
  description: string;
  timeLog: Date;
  isCompleted?: boolean;
  isEditing?: boolean;
}

export interface TaskListSettings {
  isSearchActive: boolean;
  isSortActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskListDataService {
  private _tasksLoadURL = 'assets/task-list.json';
  private _settingsLoadURL = 'assets/task-list-settings.json';

  private LSKey = 'TUDOO--task-list';

  constructor(private _httpClient: HttpClient) {}

  public loadTaskList(): Observable<Task[]> {
    const LSData = localStorage.getItem(this.LSKey);
    if (LSData) {
      return of(JSON.parse(LSData));
    } else {
      return this._httpClient.get<Task[]>(`${this._tasksLoadURL}`);
    }
  }

  public loadSettings(): Observable<TaskListSettings> {
    return this._httpClient.get<TaskListSettings>(`${this._settingsLoadURL}`);
  }

  public saveTaskList(taskList: Task[]): void {
    localStorage.setItem(this.LSKey, JSON.stringify(taskList));
  }
}
