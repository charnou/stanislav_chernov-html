import { createAction, ActionCreator, props } from '@ngrx/store';
import { Task } from '../../_models/task.model';
import { typeAction } from '../customTypes';

// LOADING
export const loadTasks: typeAction<string> = createAction(
	'[Tasks | Loading ] Load Tasks'
);

export const loadCompleted: typeAction<
	string,
	{ taskList: Task[] }
> = createAction(
	'[Tasks | Loading ] Load Completed',
	props<{ taskList: Task[] }>()
);

export const loadError: typeAction<string> = createAction(
	'[Tasks | Loading ] There was an error while loading Tasks...'
);

export const checkArrays: typeAction<string> = createAction(
	'[Tasks | Loading ] Checking arrays'
);
// EDITING
export const addTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Edit] Task Added',
	props<{ task: Task }>()
);

export const deleteTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Edit] Task deleted',
	props<{ task: Task }>()
);

export const completeTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Edit] Task completed',
	props<{ task: Task }>()
);

export const unCompleteTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Edit] Task uncompleted',
	props<{ task: Task }>()
);

export const toggleEditTask: typeAction<string, { task: Task }> = createAction(
	'[Tasks | Edit] Toggle Editing Task',
	props<{ task: Task }>()
);

export const saveChangesAfterEdit: typeAction<
	string,
	{ title: string; description: string; timeLog: Date }
> = createAction(
	'[Tasks | Edit] Edit save changes',
	props<{ title: string; description: string; timeLog: Date }>()
);

export const moveTask: ActionCreator = createAction(
	`[Tasks | Sort] Drag'n'Drop Move Task`
);

export const sortTasks: typeAction<
	string,
	{ sortedArray: Task[] }
> = createAction(
	`[Tasks | Sort] Sorted Tasks Array`,
	props<{ sortedArray: Task[] }>()
);
