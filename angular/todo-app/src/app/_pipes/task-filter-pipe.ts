import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../_models/task';

@Pipe({
	name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
	public transform(tasks: Task[], searchString: string): Task[] {
		if (!Boolean(searchString.trim())) {
			return tasks;
		} else {
			return tasks.filter((task: Task) => {
				return (
					String(task.title)
						.toLocaleLowerCase()
						.indexOf(String(searchString).toLocaleLowerCase()) !==
					-1
				);
			});
		}
	}
}
