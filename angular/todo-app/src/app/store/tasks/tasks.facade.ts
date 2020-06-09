import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { addTask, loadTasks, deleteTask, completeTask } from './tasks.actions';
import { Task } from 'src/app/_models/task.model';

@Injectable({
	providedIn: 'root',
})
export class TasksFacade {
	// loaded$ = this.store.select();
	// allCars$ = this.store.select(carsQuery.getAllCars);
	// selectedCar$ = this.store.select(carsQuery.getSelectedCar);

	constructor(private store: Store) {}

	public loadTasks(): void {
		this.store.dispatch(loadTasks({}));
	}

	public addTask(task: Task): void {
		this.store.dispatch(addTask({ task }));
	}

	public deleteTask(task: Task): void {
		this.store.dispatch(deleteTask({ task }));
	}

	public completeTask(task: Task): void {
		this.store.dispatch(completeTask({ task }));
	}
}
