import { Task } from 'src/app/_models/task.model';

export interface ITasksState {
	taskList: Task[];
	taskListCompleted: Task[];
	isTasksLoading: boolean;
}

export const initialState: ITasksState = {
	taskList: [],
	taskListCompleted: [],
	isTasksLoading: false,
};
