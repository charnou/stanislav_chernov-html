import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../_services/task-list-data.service';

@Pipe({
  name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], searchString: string): Task[] {
    if (!searchString.trim()) {
      return tasks;
    } else {
      return tasks.filter((task: Task) => {
        return (
          String(task.title)
            .toLocaleLowerCase()
            .indexOf(String(searchString).toLocaleLowerCase()) !== -1
        );
      });
    }
  }
}
