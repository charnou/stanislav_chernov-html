import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { initialState, ITasksState } from './tasks.state';

import * as TasksActions from './tasks.actions';

import { Task } from '../../_models/task.model';

const reducer: ActionReducer<ITasksState> = createReducer(
	initialState,

	on(TasksActions.loadTasks, (state: ITasksState) => {
		return {
			...state,
			isTasksLoading: true,
		};
	}),

	on(TasksActions.loadTasksCompleted, (state: ITasksState) => {
		return {
			...state,
			isTasksLoading: false,
		};
	}),

	on(
		TasksActions.addTask,
		(state: ITasksState, { task }: { task: Task }): ITasksState => {
			return {
				...state,
				taskList: [task, ...state.taskList],
			};
		}
	),

	on(
		TasksActions.deleteTask,
		(state: ITasksState, { task }: { task: Task }): ITasksState => {
			return {
				...state,
				taskList: state.taskList.filter((t: Task) => t !== task),
			};
		}
	),

	on(
		TasksActions.completeTask,
		(state: ITasksState, { task }: { task: Task }): ITasksState => {
			const taskListUpdated: Task[] = state.taskList;
			// taskListUpdated.filter(Boolean).forEach((t: Task, i: number) => {
			// 	if (t === task) {
			// 		const taskUpdated: Task = t;
			// 		taskUpdated.isCompleted = true;
			// 		console.log(taskUpdated);
			// 		taskListUpdated[i] = taskUpdated;
			// 	}
			// });

			// tslint:disable-next-line: prefer-for-of typedef
			for (let i = 0; i < taskListUpdated.length; i++) {
				if (taskListUpdated[i] === task) {
					taskListUpdated[i].isCompleted = true;
				}
			}

			return {
				...state,
				taskList: [...taskListUpdated],
			};
		}
	)

	// on(
	// 	TasksActions.toggleEditTask,
	// 	(state: ITasksState, { task }: { task: Task }): ITasksState => {
	// 		return {
	// 			...state,
	// 		};
	// 	}
	// )
);

// tslint:disable-next-line: typedef
export function tasksReducer(state: ITasksState | undefined, action: Action) {
	return reducer(state, action);
}
