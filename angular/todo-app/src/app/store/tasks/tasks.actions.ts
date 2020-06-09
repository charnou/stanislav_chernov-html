import { createAction, ActionCreator, props } from '@ngrx/store';
import { Task } from '../../_models/task.model';
import { typeAction } from '../customTypes';

export const loadTasks: typeAction<string> = createAction(
	'[Tasks | Loading ] Load Tasks'
);

export const loadTasksCompleted: typeAction<string> = createAction(
	'[Tasks | Loading ] Loading Tasks Completed'
);

export const addTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Editing] Task Added',
	props<{ task: Task }>()
);

export const deleteTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Editing] Task deleted',
	props<{ task: Task }>()
);

export const completeTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Editing] Task completed',
	props<{ task: Task }>()
);

export const toggleEditTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Editing] Toggle Editing Task',
	props<{ task: Task }>()
);

export const moveTask: ActionCreator = createAction(
	`[Tasks | Editing] Drag'n'Drop Move Task`
);

export const sortTasks: ActionCreator = createAction(
	`[Tasks | Editing] Sorted Tasks Array`
);
