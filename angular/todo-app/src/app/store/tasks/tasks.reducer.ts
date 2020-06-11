import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { initialState, ITasksState } from './tasks.state';

import { Task } from '../../_models/task.model';
import * as TasksActions from './tasks.actions';

const reducer: ActionReducer<ITasksState> = createReducer(
	initialState,

	on(
		TasksActions.loadTasks,
		(state: ITasksState): ITasksState => {
			return {
				...state,
				isTasksLoading: true,
			};
		}
	),

	on(
		TasksActions.loadCompleted,
		(
			state: ITasksState,
			{ taskList }: { taskList: Task[] }
		): ITasksState => {
			return {
				...state,
				isTasksLoading: false,
				taskList: [
					...taskList.filter((t: Task) => t.isCompleted !== true),
				],
				taskListCompleted: [
					...taskList.filter((t: Task) => t.isCompleted === true),
				],
			};
		}
	),

	on(
		TasksActions.checkArrays,
		(state: ITasksState): ITasksState => {
			const taskListUpdate: Task[] = state.taskList;
			let taskListCompletedUpdated: Task[] = state.taskListCompleted;

			taskListUpdate.forEach((t: Task, i: number) => {
				if (Boolean(taskListUpdate[i].isCompleted)) {
					taskListCompletedUpdated = [
						taskListUpdate[i],
						...taskListCompletedUpdated,
					];
				}
			});

			return {
				...state,
				taskList: [
					...state.taskList.filter(
						(t: Task) => t.isCompleted !== true
					),
				],
				taskListCompleted: [...taskListCompletedUpdated],
			};
		}
	),

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
				taskList: state.taskList.filter(
					(t: Task) => t.timeLog !== task.timeLog
				),
				taskListCompleted: state.taskListCompleted.filter(
					(t: Task) => t.timeLog !== task.timeLog
				),
			};
		}
	),

	on(
		TasksActions.completeTask,
		(state: ITasksState, { task }: { task: Task }): ITasksState => {
			return {
				...state,
				taskList: [
					...state.taskList.filter(Boolean).map((t: Task) => {
						if (t.timeLog === task.timeLog) {
							return {
								...t,
								isCompleted: true,
							};
						} else {
							return t;
						}
					}),
				],
			};
		}
	),

	on(
		TasksActions.unCompleteTask,
		(state: ITasksState, { task }: { task: Task }): ITasksState => {
			return {
				...state,
				taskList: [...state.taskList, { ...task, isCompleted: false }],
				taskListCompleted: [
					...state.taskListCompleted
						.filter(Boolean)
						.filter((t: Task) => t.timeLog !== task.timeLog),
				],
			};
		}
	),

	on(
		TasksActions.toggleEditTask,
		(state: ITasksState, { task }: { task: Task }): ITasksState => {
			return {
				...state,
				taskList: [
					...state.taskList.filter(Boolean).map((t: Task) => {
						if (t.timeLog === task.timeLog) {
							return {
								...t,
								isEditing: !t.isEditing,
							};
						} else {
							return t;
						}
					}),
				],
			};
		}
	),

	on(
		TasksActions.saveChangesAfterEdit,
		(
			state: ITasksState,
			{
				title,
				description,
				timeLog,
			}: { title: string; description: string; timeLog: Date }
		): ITasksState => {
			return {
				...state,
				taskList: [
					...state.taskList.filter(Boolean).map((t: Task) => {
						if (t.timeLog === timeLog) {
							return {
								...t,
								title: title,
								description: description,
								isEditing: false,
							};
						} else {
							return t;
						}
					}),
				],
			};
		}
	),

	on(
		TasksActions.sortTasks,
		(
			state: ITasksState,
			{ sortedArray }: { sortedArray: Task[] }
		): ITasksState => {
			return {
				...state,
				taskList: [...sortedArray],
			};
		}
	)
);

export function tasksReducer(
	state: ITasksState | undefined,
	action: Action
): ITasksState {
	return reducer(state, action);
}
