import { ITasksState } from './tasks/tasks.state';
import { ActionReducerMap } from '@ngrx/store';
import { tasksReducer } from './tasks';

export * from './tasks';

export const enum FeatureKey {
	Tasks = 'Tasks',
}

export interface IAppState {
	[FeatureKey.Tasks]: ITasksState;
}

export const reducers: ActionReducerMap<IAppState> = {
	[FeatureKey.Tasks]: tasksReducer,
};
