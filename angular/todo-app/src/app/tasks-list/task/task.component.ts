import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TaskListService } from 'src/app/_services/task-list.service';
import { Task } from 'src/app/_services/task-list-data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  // STATES
  public isDeleteHover: boolean;
  public isDoneHover: boolean;

  // INTERMEDIATE INPUTS
  public editingTitle: string;
  public editingDescription: string;

  constructor(public taskListService: TaskListService) {
    this.isDeleteHover = false;
    this.isDoneHover = false;
  }

  @Input()
  public task: Task;

  @Input()
  public index: number;

  ngOnInit() {}

  // CALL PARENT TO DELETE TASK
  public deleteTask(): void {
    this.taskListService.deleteTask(this.task);
  }

  // CALL PARENT TO COMPLETE TASK
  public completeTask(): void {
    this.taskListService.completeTask(this.task);
  }

  // CHANGE STATE TO 'EDITING'
  public editToggle(): void {
    if (!this.task.isEditing) {
      this.task.isEditing = true;
    } else {
      delete this.task.isEditing;
    }
  }

  // SYNC OF Task{} FIELD AND INTERMEDIATE INPUTS
  public syncInputs(): void {
    this.editingTitle = this.task.title;
    this.editingDescription = this.task.description;
  }

  // PUSH CHANGES FROM INTERMEDIATE INPUTS INTO Task{}
  public saveChanges(): void {
    this.task.title = this.editingTitle;
    this.task.description = this.editingDescription ;
    delete this.task.isEditing;
  }
}
