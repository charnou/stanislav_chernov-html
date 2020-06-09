import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector,
	MemoizedSelectorWithProps,
} from '@ngrx/store';
import { ITasksState } from './tasks.state';
import { IAppState, FeatureKey } from '../index';
import { Task } from '../../_models/task.model';

export const selectStateTasks: MemoizedSelector<
	IAppState,
	ITasksState
> = createFeatureSelector<IAppState, ITasksState>(FeatureKey.Tasks);

export const selectTasks: MemoizedSelector<IAppState, Task[]> = createSelector(
	selectStateTasks,
	(state: ITasksState) => state.taskList
);

export const selectTaskByTimelog: MemoizedSelectorWithProps<
	IAppState,
	Task,
	Task[]
> = createSelector(selectStateTasks, (state: ITasksState, props: Task) =>
	state.taskList.filter((task: Task) => task.timeLog === props.timeLog)
);

export const selectIsTasksLoading: MemoizedSelector<
	IAppState,
	boolean
> = createSelector(
	selectStateTasks,
	(state: ITasksState) => state.isTasksLoading
);
