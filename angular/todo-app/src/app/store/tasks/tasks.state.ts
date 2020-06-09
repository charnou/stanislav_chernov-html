import { Task } from 'src/app/_models/task.model';

export interface ITasksState {
	taskList: Task[];
	isTasksLoading: boolean;
}

export const initialState: ITasksState = {
	taskList: [],
	isTasksLoading: false,
};
